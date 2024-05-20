import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
 
import WorkspaceList from './components/Workspace/WorkspaceList';
 
import JoinWorkspace from './components/Workspace/JoinWorkspace';
import RoleCreation from './components/Workspace/RoleCreation';
import InvitationLink from './components/Workspace/InvitationLink';
import CreateWorkspace from './components/Workspace/Createworkspace';
import Register from './components/Auth/Signup';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/workspaces" element={<WorkspaceList />} />
                    <Route path="/create-workspace" element={<CreateWorkspace />} />
                    <Route path="/join-workspace" element={<JoinWorkspace />} />
                    <Route path="/roles/:workspaceId" element={<RoleCreation />} />
                    <Route path="/invite/:roleId" element={<InvitationLink />} />
                    <Route path="/" element={<Register />} exact />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
