import React, { useEffect } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 4000); // auto close in 4 seconds
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="error-toast-container">
            <div className="error-toast">
                <span>{message}</span>
                <button className="toast-close-btn" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default ErrorMessage;
