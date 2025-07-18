// components/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <h1 className="notfound-code">404</h1>
            <p className="notfound-text">Page Not Found</p>
            <p className="notfound-subtext">The page you're looking for doesn't exist or has been moved.</p>
            <button className="notfound-button" onClick={() => navigate('/')}>Go Home</button>
        </div>
    );
};

export default NotFound;
