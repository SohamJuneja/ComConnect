import React, { useEffect, useState } from "react";
import { Box, Stack, Text, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import { ChatState } from "../Context/ChatProvider";
import { useParams } from "react-router-dom";
import { fetchChats } from "../utils/api";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { getSender } from "../config/ChatLogics";
import "./chatbox.css";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const { workspaceId } = useParams();
  console.log("worspaceid", workspaceId);
  const toast = useToast();

  const handleFetchChats = async () => {
    try {
      if (!workspaceId) {
        throw new Error("No workspace selected.");
      }
      const data = await fetchChats(user.token, workspaceId);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  console.log("chats", chats);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    handleFetchChats();
  }, [fetchAgain, workspaceId]);

  // Sort chats by chatName
  const sortedChats = Array.isArray(chats)
    ? [...chats].sort((a, b) => a.chatName.length - b.chatName.length)
    : [];

  return (
    <Box
      d="flex"
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w="100%"
      h="calc(100vh - 100px)" // Adjust height to fit the viewport
      borderRadius="lg"
      borderWidth="1px"
      className="my-chats-container"
    >
      <Button className="groupchat">My Chats</Button>
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            textAlign={"center"}
            className="groupchatbtn"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="auto"
        className="group-chat-content"
      >
        {Array.isArray(chats) ? (
          <Stack overflowY="scroll">
            {sortedChats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
