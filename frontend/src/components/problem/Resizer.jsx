import React, { useEffect } from 'react';
import './ProblemPage.css';

const Resizer = () => {
    useEffect(() => {
        const resizer = document.querySelector('.resizer');
        const leftPanel = document.querySelector('.left-panel');
        const rightPanel = document.querySelector('.right-panel');
        let isDragging = false;

        const handleMouseDown = (e) => {
            isDragging = true;
            document.body.style.cursor = 'col-resize';
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const containerOffsetLeft = document.querySelector('.container').offsetLeft;
            const pointerRelativeXpos = e.clientX - containerOffsetLeft;
            const containerWidth = document.querySelector('.container').offsetWidth;

            const leftPanelWidth = Math.min(Math.max(pointerRelativeXpos, 200), containerWidth - 200);
            leftPanel.style.width = `${leftPanelWidth}px`;
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        };

        resizer.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            resizer.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (

        <div className="resizer" />
    );
};

export default Resizer;
