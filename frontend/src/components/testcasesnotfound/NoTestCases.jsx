// components/NoTestCases.jsx
import React from 'react';
import './NoTestCases.css';

const NoTestCases = () => {
    return (
        <div className="no-testcases-container">
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-7621861-6165923.png"
                alt="No test cases"
                className="no-testcases-image"
            />
            <h2 className="no-testcases-title">Oops! No Test Cases Yet 😅</h2>
            <p className="no-testcases-message">
                We're still working on adding test cases for this problem. Hang tight — they'll be here soon!
            </p>
            <p className="no-testcases-subtext">
                Meanwhile, feel free to solve the problem and test your logic manually. We're always improving to give you the best experience!
            </p>
        </div>
    );
};

export default NoTestCases;
