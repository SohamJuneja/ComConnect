import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useWorkspace } from "../../Context/WorkspaceProvider";
import { useNavigate } from "react-router-dom";
import CreateWorkspaceModal from "./CreateWorkspaceModal"; // Add this import

import "./workspace.css";
import JoinWorkspaceModal from "./JoinWorkspaceModal";

const WorkspaceSelection = () => {
  const { userWorkspaces, setUserWorkspaces } = useWorkspace();
  console.log("workspaces", userWorkspaces);
  const navigate = useNavigate();

  const handleSelectWorkspace = (workspace) => {
    setUserWorkspaces(workspace);
    let workspaceId = workspace._id;
    console.log("worksapce_id", workspace._id);
    navigate(`/workspace/${workspaceId}/chats`);
  };

  return (
    <div className="workspace_main">
      <div className="workspace_lol">
        <CreateWorkspaceModal>Create Workspace</CreateWorkspaceModal>
      </div>
      <div className="join_workspace_modal">
      <JoinWorkspaceModal>
            <div className="join_workspace_btn">Join Workspace</div>
          </JoinWorkspaceModal>
        <div className="join_workspace_lol">
          {Array.isArray(userWorkspaces) && userWorkspaces.length > 0 ? (
            userWorkspaces.map((workspace) => (
              <Button
                className="cnt"
                key={workspace._id}
                onClick={() => handleSelectWorkspace(workspace)}
              >
                {workspace.workspaceName}
              </Button>
            ))
          ) : (
            <Box>
              <div className="simple">"No workspaces available"</div>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSelection;
