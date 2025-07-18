import React from 'react';
import './DSASheetCard.css';
import { Link } from 'react-router-dom';

const DSASheetCard = ({ title, slogan, link }) => {
    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-slogan">“{slogan}”</p>
            <Link to="/dsa-sheet" className="card-btn">
                View Sheet
            </Link>
        </div>
    );
};

export default DSASheetCard;
