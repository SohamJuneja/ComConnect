import axios from 'axios';

const API_URL = 'http://localhost:8000/api/workspaces';

const createWorkspace = (workspaceName, personName) => {
    return axios.post(`${API_URL}/create`, { workspaceName, personName }, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
};

 // Function to join a workspace
const joinWorkspace = (workspaceId) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    console.log(token)
    return axios.post(`${API_URL}/join`, { workspaceId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getWorkspaces = () => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    });
};

export default {
    createWorkspace,
    joinWorkspace,
    getWorkspaces,
};
