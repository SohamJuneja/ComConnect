import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { useWorkspace } from "../../Context/WorkspaceProvider";
import { useNavigate } from "react-router-dom";
import { workspace } from "../../utils/media/media";
import "./workspace.css";

const CreateWorkspaceModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [roles, setRoles] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [emails, setEmails] = useState("");
  const { user } = useWorkspace();
  const [workspaceId, setWorkspaceId] = useState(null);
  const navigate = useNavigate();

  const token =
    user?.token || JSON.parse(localStorage.getItem("userInfo"))?.token;

  const createWorkspace = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/workspace",
        { name: workspaceName, roles },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Workspace created:", response.data);
      setWorkspaceId(response.data.workspace._id);
      setStep(2);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/workspace/${workspaceId}/roles`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRoleList(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const sendInvitation = (email, role) => {
    const templateParams = {
      to_email: email,
      workspace_id: workspaceId,
      workspace_name: workspaceName,
      role_name: role,
      portal_link: "http://your-portal-link.com",
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
        },
        (error) => {
          console.error("Error sending email:", error.text);
        }
      );
  };

  const inviteUsers = () => {
    const emailsArray = emails.split(",").map((email) => email.trim());
    emailsArray.forEach((email) => sendInvitation(email, selectedRole));
  };

  useEffect(() => {
    if (step === 2 && workspaceId) {
      fetchRoles();
    }
  }, [step, workspaceId]);

  const handleDone = () => {
    navigate(`/workspace/${workspaceId}/chats`);
  };

  const [showPopup, setShowPopup] = useState(false);

  // const handleCreateWorkspace = () => {
  //   setShowPopup(true);
  // };
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);

  const handleCreateWorkspace = () => {
    setShowCreateWorkspace(true);
  };

  return (
    <div className="workspace_page">
      {showPopup && (
        <div className="popup">
          <h2>Workspace Created!</h2>
          <p>Your workspace has been successfully created.</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
      <div className="workspace_display">
        <div className="workspace_content">
          <div className="workspace_content_heading">
            Create a new ComConnect Workspace
          </div>
          <div className="workspace_content_description">
            Introducing ComConnect: Revolutionizing college communities by
            connecting students, allocating roles based on preferences, and
            creating teams that feel like family. Empower collaboration and
            enhance productivity with comConnect! to create a workspace click on
            the button below
            <div className="create_workspace_btn_container">
              <button
                className="create_workspace_btn"
                onClick={handleCreateWorkspace}
              >
                createWorkspace
              </button>
            </div>
          </div>
        </div>
        <div className="workspace_img_container">
          <img className="workspace_img" src={workspace} alt="workspace" />
        </div>
      </div>
      <div className="modal">
        <div className="modal_content">
          {showCreateWorkspace && (
            <div>
              <h2>Create Workspace</h2>
              <div className="workspace_holder">
                <input
                  type="text"
                  placeholder="Workspace Name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Add Role"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRoles([...roles, e.target.value]);
                      e.target.value = "";
                    }
                  }}
                />
                <ol className="iskima">
                  {roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ol>
              </div>
              <div className="workspace_btn">
                <button onClick={createWorkspace}>Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Invite Users</h2>
              <ul>
                {roleList.map((role, index) => (
                  <li key={index}>
                    {role.roleName}{" "}
                    <button onClick={() => setSelectedRole(role.roleName)}>
                      Invite
                    </button>
                  </li>
                ))}
              </ul>
              {selectedRole && (
                <div>
                  <h3>Invite Users to {selectedRole}</h3>
                  <input
                    type="text"
                    placeholder="Enter emails separated by commas"
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                  />
                  <button onClick={inviteUsers}>Send Invitations</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="modal_button">
          {showCreateWorkspace && (
            <>
              <button onClick={onClose}>Close</button>
              <button onClick={handleDone}>Done</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
