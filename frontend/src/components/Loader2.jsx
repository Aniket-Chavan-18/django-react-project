import React from 'react';
import "../css/loader2.css"


const Loader2 = ({ width = '100%', height = '200px', borderRadius = '12px' }) => {
  return (
    <div
      className="loader-shimmer"
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Loader2;
