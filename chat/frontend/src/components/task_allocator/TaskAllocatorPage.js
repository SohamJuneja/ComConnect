import React from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import TaskAllocator from "./TaskAllocator";

const TaskAllocatorPage = () => {
  const { workspaceId } = useParams(); // Get workspaceId from URL

  return (
    <Box
      position="relative"
      zIndex="1000"
      overflowY="scroll"          // Allows scrolling
      maxHeight="100vh"          // Ensure it doesn't exceed viewport height
      css={{
        '&::-webkit-scrollbar': {
          display: 'none'        // Hide scrollbar for WebKit browsers
        },
        scrollbarWidth: 'none',   // Hide scrollbar for Firefox
        msOverflowStyle: 'none'   // Hide scrollbar for IE and Edge
      }}
    >
      <TaskAllocator workspaceId={workspaceId} />
    </Box>
  );
};

export default TaskAllocatorPage;
