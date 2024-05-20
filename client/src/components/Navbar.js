import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/workspaces">Workspaces</Link></li>
                <li><Link to="/create-workspace">Create Workspace</Link></li>
                <li><Link to="/join-workspace">Join Workspace</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;