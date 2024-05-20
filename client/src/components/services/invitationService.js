import axios from 'axios';

const API_URL = 'http://localhost:8000/api/invitations/send';

const sendInvitation = (workspaceId, role, email) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log("sendinvi");
    console.log(token);
    return axios.post(`${API_URL}/send`, { workspaceId, role, email }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default {
    sendInvitation,
};
