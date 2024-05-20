import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import workspaceService from '../services/workspaceService.js';

const JoinWorkspace = () => {
    const [workspaceId, setWorkspaceId] = useState('');
    const navigate = useNavigate();

    const handleJoinWorkspace = async (e) => {
        e.preventDefault();
        try {
            await workspaceService.joinWorkspace(workspaceId);
            navigate(`/workspaces/${workspaceId}`);
        } catch (error) {
            alert('Error joining workspace');
        }
    };

    return (
        <div>
            <h2>Join Workspace</h2>
            <form onSubmit={handleJoinWorkspace}>
                <div>
                    <label>Workspace ID:</label>
                    <input
                        type="text"
                        value={workspaceId}
                        onChange={(e) => setWorkspaceId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Join</button>
            </form>
        </div>
    );
};

export default JoinWorkspace;
