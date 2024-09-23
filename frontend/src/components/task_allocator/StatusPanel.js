import React from "react";
import {
  Box,
  Text,
  VStack,
  Select,
  FormControl,
  Button,
} from "@chakra-ui/react";
import TaskCard from "./TaskCard";

const StatusPanel = ({ title, tasks, fetchTasks, config, onTaskClick }) => {
  return (
    <Box
      w="100%"
      maxW="400px"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      boxShadow="md"
    >
      <Text fontSize="2xl" mb={4}>
        {title}
      </Text>
      <VStack spacing={4}>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            fetchTasks={fetchTasks}
            config={config}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default StatusPanel;
