import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

import "./chat.css";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="chats-sec" style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="chat-main">
        <div className="sidebar">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className="chatting">
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
