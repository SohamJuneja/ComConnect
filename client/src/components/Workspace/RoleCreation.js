import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roleService from '../services/roleService';

const RoleCreation = () => {
    const [roles, setRoles] = useState([]);
    const { workspaceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await roleService.getRoles(workspaceId);
            setRoles(response.data);
        };
        fetchRoles();
    }, [workspaceId]);

    const handleRoleClick = (roleId) => {
        navigate(`/workspaces/${workspaceId}/invite/${roleId}`);
    };

    return (
        <div>
            <h2>Roles</h2>
            <ul>
                {roles.map((role) => (
                    <li key={role._id} onClick={() => handleRoleClick(role._id)}>
                        {role.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleCreation;
