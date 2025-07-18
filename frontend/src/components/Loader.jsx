// Loader.jsx
import React from 'react';
import '../css/loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="dot-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;