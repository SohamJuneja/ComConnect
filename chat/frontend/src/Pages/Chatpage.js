import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import TaskAllocator from "../components/Task_allocator/task";

import "./chat.css";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const [isTaskAllocatorOpen, setIsTaskAllocatorOpen] = useState(false);

  const toggleTaskAllocator = () => {
    setIsTaskAllocatorOpen(!isTaskAllocatorOpen);
  };

  return (
    <div className="chats-sec" style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="chat-main">
        <div
          className={`task-allocator ${
            isTaskAllocatorOpen ? "open" : "closed"
          }`}
        >
          <TaskAllocator />
          {isTaskAllocatorOpen && (
            <button className="close-button" onClick={toggleTaskAllocator}>
              &times;
            </button>
          )}
        </div>
        <div className={`sidebar ${isTaskAllocatorOpen ? "reduced" : "full"}`}>
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className={`chatting ${isTaskAllocatorOpen ? "reduced" : "full"}`}>
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
        {!isTaskAllocatorOpen && (
          <button className="toggle-button" onClick={toggleTaskAllocator}>
            Allocate Task to the Groups
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatpage;
