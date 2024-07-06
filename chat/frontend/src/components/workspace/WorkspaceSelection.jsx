import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useWorkspace } from "../../Context/WorkspaceProvider";
import { useNavigate } from "react-router-dom";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import JoinWorkspaceModal from "./JoinWorkspaceModal";
import "./workspace.css";
const WorkspaceSelection = () => {
  const { userWorkspaces, setUserWorkspaces } = useWorkspace();
  console.log("workspaces", userWorkspaces);
  const navigate = useNavigate();

  const handleSelectWorkspace = (workspace) => {
    setUserWorkspaces(workspace);
    let workspaceId = workspace._id;
    console.log("worksapce_id",workspace._id);
    navigate(`/workspace/${workspaceId}/chats`);
  };

  return (
    <div className="workspace_main">
      <div className="workspace_lol">
        <CreateWorkspaceModal>Create Workspace</CreateWorkspaceModal>
      </div>

      <div className="join_workspace_modal">
        <div className="join_workspace_lol">
          <JoinWorkspaceModal>
            <div className="join_workspace_btn">Join Workspace</div>
          </JoinWorkspaceModal>
          {Array.isArray(userWorkspaces) && userWorkspaces.length > 0 ? (
            userWorkspaces.map((workspace) => (
              <Button
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
