// components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <span className="footer-logo">🌐 CodeSphere</span>
                <p className="footer-text">
                    Crafted with ❤️ by <strong>Aniket Chavan</strong>
                </p>
                <div className="footer-wave"></div>
            </div>
        </footer>
    );
};

export default Footer;
