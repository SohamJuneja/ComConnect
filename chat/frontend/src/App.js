import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import WorkspaceSelection from "./components/workspace/WorkspaceSelection";
import WorkspaceProvider from "./Context/WorkspaceProvider";

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <ChatProvider>
          <WorkspaceProvider>
            <div className="container">
              <Routes>
                <Route path="/" element={<Homepage />} exact />
                <Route path="/chats" element={<Chatpage />} />
                <Route path="/workspace" element={<WorkspaceSelection />} />
                <Route path="/workspace/:workspaceId/chats" element={<Chatpage />} /> {/* Add this route */}
              </Routes>
            </div>
          </WorkspaceProvider>
        </ChatProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
