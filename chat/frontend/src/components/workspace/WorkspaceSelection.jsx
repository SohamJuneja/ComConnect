import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useWorkspace } from "../../Context/WorkspaceProvider";
import { useNavigate } from "react-router-dom";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import JoinWorkspaceModal from "./JoinWorkspaceModal";

const WorkspaceSelection = () => {
  const { workspaces, setSelectedWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const handleSelectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    navigate("/chats");
  };

  return (
    <VStack spacing="10px">
      <CreateWorkspaceModal>Create Workspace</CreateWorkspaceModal>
      <JoinWorkspaceModal>Join Workspace</JoinWorkspaceModal>
      {workspaces.map((workspace) => (
        <Button
          key={workspace._id}
          onClick={() => handleSelectWorkspace(workspace)}
        >
          {workspace.name}
        </Button>
      ))}
    </VStack>
  );
};

export default WorkspaceSelection;
