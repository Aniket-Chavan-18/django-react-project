import React, { useState } from 'react';
import './AcceptedPage.css';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';


const Graph = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="graph-container">
            <div className="y-axis-labels">
                {[100, 80, 60, 40, 20, 0].map((val) => (
                    <span key={val}>{val}%</span>
                ))}
            </div>
            <div className="graph">
                {data.map((point, index) => (
                    <div className="bar-container" key={index}>
                        <div
                            className="bar"
                            style={{ height: `${point.y}%` }}
                        >
                            <div className="tooltip">
                                {point.y.toFixed(2)}% submissions ≤ {point.x.toFixed(2)}ms
                            </div>
                        </div>
                        <span className="x-label">{point.x.toFixed(0)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AcceptedPage = ({ result, setCode, calcuations, id }) => {
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState('runtime');
    const [notes, setNotes] = useState('');
    const user = calcuations.user
    const copyToClipboard = () => {
        navigator.clipboard.writeText(codeSnippet);
    };


    const codeSnippet = calcuations.code
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
        <div className="accepted-container">
            <div className="header-top">
                <div className="status-text success" style={{ color: "green" }}>Accepted</div>
                <div className="testcase-info">{result.test_cases_passes} / {result.test_cases_passes} testcases passed</div>
                <div className="row-meta">
                    <div className="username">{user}</div>
                    <div className="submitted-time">Submitted at {calcuations.submittedAt}</div>
                </div>
            </div>

            <div className="stats-buttons">
                <button
                    className={view === 'runtime' ? 'active' : ''}
                    onClick={() => setView('runtime')}
                >
                    Runtime<br />{Math.round((result.exec_time_sec * 1000))} ms<br />Beats {calcuations.beats.time_percent}%
                </button>
                <button
                    className={view === 'memory' ? 'active' : ''}
                    onClick={() => setView('memory')}
                >
                    Memory<br />{Math.round((result.memory_usage_kb / 1024))} MB<br />Beats {calcuations.beats.memory_percent}%
                </button>
            </div>

            <Graph data={view === 'runtime' ? calcuations.runtime_graph : calcuations.memory_graph} />

            <div className="code-section">
                <h2>Code</h2>
                <div className="code-buttons">
                    <button onClick={copyToClipboard}>Copy Code</button>
                    <button onClick={() => setCode(codeSnippet)}>Copy to Editor</button>
                </div>
                <SyntaxHighlighter language="python" style={materialOceanic} showLineNumbers>
                    {codeSnippet}
                </SyntaxHighlighter>
            </div>

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

export default AcceptedPage;
