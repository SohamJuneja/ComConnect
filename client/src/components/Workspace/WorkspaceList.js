import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import workspaceService from '../services/workspaceService.js';

const WorkspaceList = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await workspaceService.getWorkspaces();
                setWorkspaces(response.data);
            } catch (error) {
                console.error('Error fetching workspaces', error);
            }
        };
        fetchWorkspaces();
    }, []);

    const handleCreateWorkspace = () => {
        navigate('/create-workspace');
    };

    const handleJoinWorkspace = () => {
        navigate('/join-workspace');
    };

    return (
        <div>
            <h2>Workspaces</h2>
            <button onClick={handleCreateWorkspace}>Create Workspace</button>
            <button onClick={handleJoinWorkspace}>Join Workspace</button>
            <ul>
                {workspaces.map((workspace) => (
                    <li key={workspace._id}>
                        <a href={`/roles/${workspace._id}`}>{workspace.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkspaceList;
