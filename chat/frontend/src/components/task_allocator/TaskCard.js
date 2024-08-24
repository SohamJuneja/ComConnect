import React from "react";
import {
  Box,
  Text,
  Textarea,
  Select,
  FormControl,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const TaskCard = ({ task, fetchTasks, config, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newStatus, setNewStatus] = React.useState(task.status);
  const [comment, setComment] = React.useState("");

  const updateTaskStatus = async () => {
    try {
      await axios.patch(
        "https://comconnect-backend.onrender.com/api/tasks/update-status",
        { taskId: task._id, status: newStatus },
        config
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const addComment = async () => {
    try {
      await axios.post(
        "https://comconnect-backend.onrender.com/api/tasks/add-comment",
        { taskId: task._id, comment },
        config
      );
      fetchTasks();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box p={4} shadow="md" borderWidth="1px" cursor="pointer" onClick={onOpen}>
      <Text fontWeight="bold">{task.heading}</Text>
      <Text>{task.description}</Text>
      <Text>Assignee: {task.assignee.email}</Text>
      <Text>Created By: {task.createdBy.email}</Text>
      <FormControl mt={4}>
        <Select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Select>
        <Button mt={2} colorScheme="blue" onClick={updateTaskStatus}>
          Update Status
        </Button>
      </FormControl>

      {/* Modal for task details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{task.heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Description:</Text>
            <Text mb={4}>{task.description}</Text>
            <Text fontWeight="bold">Assignee:</Text>
            <Text mb={4}>{task.assignee.email}</Text>
            <Text fontWeight="bold">Created By:</Text>
            <Text mb={4}>{task.createdBy.email}</Text>

            <Textarea
              mt={4}
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addComment}>
              Add Comment
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TaskCard;
