import axios from 'axios';

const API_URL = 'http://localhost:8000/api/roles';

const createRole = (workspaceId, name) => {
    return axios.post(`${API_URL}/create`, { workspaceId, name }, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
};

const getRoles = (workspaceId) => {
    return axios.get(`${API_URL}/${workspaceId}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
};

const getInvitationLink = (roleId) => {
    return axios.get(`${API_URL}/invite/${roleId}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
};

export default {
    createRole,
    getRoles,
    getInvitationLink,
};
