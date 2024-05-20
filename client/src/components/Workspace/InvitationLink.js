import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import roleService from '../services/roleService';

const InvitationLink = () => {
    const [inviteLink, setInviteLink] = useState('');
    const { roleId } = useParams();

    useEffect(() => {
        const fetchInviteLink = async () => {
            const response = await roleService.getInvitationLink(roleId);
            setInviteLink(response.data);
        };
        fetchInviteLink();
    }, [roleId]);

    return (
        <div>
            <h2>Invitation Link</h2>
            <p>{inviteLink}</p>
        </div>
    );
};

export default InvitationLink;
