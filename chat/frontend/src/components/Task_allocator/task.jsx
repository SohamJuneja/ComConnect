import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const TaskAllocator = () => {
  const { user } = ChatState();
  const toast = useToast();
  const navigate = useNavigate();

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [status, setStatus] = useState("to-do");
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState("");
  const [taskId, setTaskId] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/tasks/my-tasks",
        config
      );
      setTasks(data);
      console.log("fetchtaks", data);
    } catch (error) {
      toast({
        title: "Error fetching tasks",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const allocateTask = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/tasks/allocate",
        { heading, description, email, workspaceId, attachments },
        config
      );
      toast({
        title: "Task Allocated",
        description: "Task has been successfully allocated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTasks([...tasks, data]);
    } catch (error) {
      toast({
        title: "Error allocating task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateTaskStatus = async () => {
    try {
      const { data } = await axios.patch(
        "http://localhost:5001/api/tasks/update-status",
        { taskId, status },
        config
      );
      toast({
        title: "Task Status Updated",
        description: "Task status has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchTasks(); // Refresh the tasks
    } catch (error) {
      toast({
        title: "Error updating task status",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addComment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/tasks/add-comment",
        { taskId, comment: comments },
        config
      );
      toast({
        title: "Comment Added",
        description: "Comment has been successfully added to the task.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchTasks(); // Refresh the tasks
    } catch (error) {
      toast({
        title: "Error adding comment",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <FormControl id="heading" isRequired>
        <FormLabel>Heading</FormLabel>
        <Input value={heading} onChange={(e) => setHeading(e.target.value)} />
      </FormControl>
      <FormControl id="description" isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired mt={4}>
        <FormLabel>Assignee Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="workspaceId" isRequired mt={4}>
        <FormLabel>Workspace ID</FormLabel>
        <Input
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
        />
      </FormControl>
      <FormControl id="attachments" mt={4}>
        <FormLabel>Attachments</FormLabel>
        <Input
          value={attachments}
          onChange={(e) => setAttachments(e.target.value.split(","))}
        />
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={allocateTask}>
        Allocate Task
      </Button>

      <FormControl id="status" mt={8}>
        <FormLabel>Update Task Status</FormLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Select>
        <Input
          placeholder="Enter Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          mt={2}
        />
        <Button colorScheme="blue" mt={2} onClick={updateTaskStatus}>
          Update Status
        </Button>
      </FormControl>

      <FormControl id="comments" mt={8}>
        <FormLabel>Add Comment</FormLabel>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <Input
          placeholder="Enter Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          mt={2}
        />
        <Button colorScheme="blue" mt={2} onClick={addComment}>
          Add Comment
        </Button>
      </FormControl>

      <Box mt={8}>
        <Button colorScheme="blue" onClick={fetchTasks}>
          Fetch My Tasks
        </Button>
        <Box mt={4}>
          {tasks?.map((task) => (
            <Box key={task._id} p={4} shadow="md" borderWidth="1px" mt={2}>
              <p>
                <strong>Heading:</strong> {task.heading}
              </p>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Assignee:</strong> {task.assignee.email}
              </p>
              <p>
                <strong>Created By:</strong> {task.createdBy.email}
              </p>
              <p>
                <strong>Comments:</strong>
              </p>
              <ul>
                {task.comments.map((comment, index) => (
                  <li key={index}>{comment.comment}</li>
                ))}
              </ul>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TaskAllocator;
