import React, { useState } from 'react';
import '../../css/Wrongans.css'; // Reuse the same styles for consistency
import { useSelector } from 'react-redux'

const RuntimeError = ({ result, id }) => {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false)

    const token = useSelector(state => state.token.token)
    const notesHandler = async () => {
        setLoading(true)
        const data = {
            notes,
            id
        }
        if (token !== false) {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/problems/submission/notes/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                })

            } catch (error) {
                console.log('error')
            } finally {
                setLoading(false)
                setNotes("")
            }
        }
    }

    return (
        <div className="result-container">
            {/* Top Status Section */}
            <div className="status-header">
                <h2 className="status-text" style={{ color: 'var(--danger-color)' }}>⚠️ Runtime Error</h2>
                <p className="testcase-info">Occurred during execution</p>
            </div>

            {/* Middle Error Section */}
            <div className="testcase-box">
                <h3>Error Details</h3>

                <div className="testcase-section">
                    <p className="label">Error Message:</p>
                    <pre style={{ color: 'red' }}>{result.stderr}</pre>
                </div>

                <div className="testcase-section">
                    <p className="label">Input:</p>
                    {
                        typeof result.last_executed_input.input === "object" ?
                            Object.entries(result.last_executed_input.input).map(([key, value], index) => (
                                <pre key={index}>{key} {Array.isArray(value) ? `[${value.join(", ")}]` : value}</pre>
                            )) : <div>{result.last_executed_input.input}</div>
                    }

                </div>
            </div>

            {/* Notes Section */}

            <div className="notes">
                <h2>Notes</h2>
                <textarea
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your notes here..."
                ></textarea>
                <button onClick={notesHandler}>{loading ? "Saving" : "Save Notes"}</button>
            </div>
        </div>
    );
};

export default RuntimeError;
