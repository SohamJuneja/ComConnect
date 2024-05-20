import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import workspaceService from '../services/workspaceService';
import roleService from '../services/roleService';
import invitationService from '../services/invitationService';

const CreateWorkspace = () => {
    const [personName, setPersonName] = useState('');
    const [workspaceName, setWorkspaceName] = useState('');
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState('');
    const [roleEmails, setRoleEmails] = useState({});
    const [currentRole, setCurrentRole] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleCreateWorkspace = async (e) => {
        e.preventDefault();
        try {
            const workspace = await workspaceService.createWorkspace(workspaceName, personName);
            for (const role of roles) {
                await roleService.createRole(workspace.data._id, role);
            }
            alert('Workspace and roles created successfully');
            navigate(`/workspaces/${workspace.data._id}/roles`);
        } catch (error) {
            alert('Error creating workspace or roles');
        }
    };

    const handleSendInvitations = async (role) => {
        try {
            const workspaceId = workspaceService.getCurrentWorkspaceId(); // Assuming you have a way to get the current workspace ID
            const emails = roleEmails[role] || [];
            for (const email of emails) {
                await invitationService.sendInvitation(workspaceId, role, email);
            }
            alert(`Invitations sent for role: ${role}`);
        } catch (error) {
            alert('Error sending invitations');
        }
        setEmail('');
    };

    const handleAddRole = () => {
        if (newRole) {
            setRoles([...roles, newRole]);
            setNewRole('');
        }
        
    };

    const handleAddEmail = () => {
        if (email) {
            setRoleEmails({
                ...roleEmails,
                [currentRole]: [...(roleEmails[currentRole] || []), email],
            });
            setEmail('');
        }
    };

    return (
        <div>
            <h2>Create Workspace</h2>
            <form onSubmit={handleCreateWorkspace}>
                <div>
                    <label>Person Name:</label>
                    <input
                        type="text"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Workspace Name:</label>
                    <input
                        type="text"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Roles:</label>
                    <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    />
                    <button type="button" onClick={handleAddRole}>Add Role</button>
                </div>
                <ul>
                    {roles.map((role, index) => (
                        <li key={index}>
                            {role}
                            <button type="button" onClick={() => setCurrentRole(role)}>Invite Users</button>
                            {currentRole === role && (
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                     <ul>
                                        {(roleEmails[role] || []).map((email, idx) => (
                                            <li key={idx}>{email}</li>
                                        ))}
                                    </ul>
                                    <button type="button" onClick={() => handleSendInvitations(role)}>Send Invitations</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <button type="submit">Create Workspace and Roles</button>
            </form>
        </div>
    );
};

export default CreateWorkspace;
