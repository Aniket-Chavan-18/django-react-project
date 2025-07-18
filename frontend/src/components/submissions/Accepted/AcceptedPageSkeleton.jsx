import React from 'react';
import './AcceptedPage.css';
import './shimmereffct.css'

const AcceptedPageSkeleton = () => {
    return (
        <div className="accepted-container">
            <div className="header-top">
                <div className="shimmer skeleton-box" style={{ height: '28px', width: '150px' }}></div>
                <div className="shimmer skeleton-box" style={{ width: '120px' }}></div>
                <div className="row-meta">
                    <div className="shimmer skeleton-box" style={{ width: '100px' }}></div>
                    <div className="shimmer skeleton-box" style={{ width: '160px' }}></div>
                </div>
            </div>

            <div className="stats-buttons">
                <div className="shimmer skeleton-btn"></div>
                <div className="shimmer skeleton-btn"></div>
            </div>

            <div className="graph-container">
                <div className="y-axis-labels">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="shimmer skeleton-box" style={{ width: '20px' }}></div>
                    ))}
                </div>
                <div className="graph">
                    {[...Array(5)].map((_, i) => (
                        <div className="bar-container" key={i}>
                            <div className="shimmer skeleton-bar"></div>
                            <span className="x-label shimmer skeleton-box" style={{ width: '20px', height: '10px' }}></span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="code-section">
                <div className="shimmer skeleton-box" style={{ width: '80px' }}></div>
                <div className="shimmer skeleton-code"></div>
            </div>

            <div className="notes">
                <div className="shimmer skeleton-box" style={{ width: '60px' }}></div>
                <div className="shimmer skeleton-box" style={{ height: '80px' }}></div>
                <div className="shimmer skeleton-btn" style={{ width: '80px' }}></div>
            </div>
        </div>
    );
};

export default AcceptedPageSkeleton;
