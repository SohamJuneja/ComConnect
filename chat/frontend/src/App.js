import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";

const App = () => {
    return (
        <Router>
          <ChakraProvider>
    <ChatProvider> 
             <div className="container">
                <Routes>
                    <Route path="/" element={<Homepage />} exact />
                    <Route path="/chats" element={<Chatpage /> } />
                </Routes>
            </div>
            </ChatProvider>
  </ChakraProvider>
        </Router>
    );
};

export default App;
