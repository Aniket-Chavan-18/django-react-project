import React, { useState } from 'react';
import "../../css/Wrongans.css"
import { useSelector } from 'react-redux'

const WrongAnswer = ({ result, id }) => {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false)

    const notesHandler = async () => {
        setLoading(true)
        const token = localStorage.getItem("access_token") ?? false
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
                <h2 className="status-text">❌ Wrong Answer</h2>
                <p className="testcase-info">{result.test_cases_passes} / {result.total} Test Cases Passed</p>
            </div>

            {/* Middle Test Case Section */}
            <div className="testcase-box">
                <h3>Failed Test Case</h3>
                <div className="testcase-section">
                    <p className="label">Input:</p>
                    {
                        typeof result.last_executed_input.input === "object" ?
                            Object.entries(result.last_executed_input.input).map(([key, value], index) => (
                                <pre key={index}>{key} {Array.isArray(value) ? `[${value.join(", ")}]` : value}</pre>
                            )) : <div>{result.last_executed_input.input}</div>
                    }
                </div>
                <div className="testcase-section">
                    <p className="label">Your Output:</p>
                    <pre>{String(result.user_out)}</pre>
                </div>
                <div className="testcase-section">
                    <p className="label">Expected Output:</p>
                    <pre>{String(result.last_executed_input.expected_output)}</pre>
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

export default WrongAnswer;
