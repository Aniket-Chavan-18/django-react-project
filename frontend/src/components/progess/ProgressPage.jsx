import { useEffect, useState } from "react";
import "./ProgressPage.css";

const ProgressPage = () => {
    const [view, setView] = useState("solved"); // or 'submissions'
    const [month, setMonth] = useState("June");
    const [year, setYear] = useState("2025");

    const [history, setHistory] = useState([]); // submissions
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        // Simulate fetching data
        const sampleData = {
            history: [
                { title: "Two Sum", status: "Accepted", date: "2025-06-20" },
                { title: "Binary Search", status: "Wrong Answer", date: "2025-06-19" }
            ],
            summary: {
                solved: 30,
                beats: 80,
                easy: 15,
                medium: 10,
                hard: 5,
                submissions: 60,
                acceptance: "50%"
            },
            graph: {
                solved: [5, 10, 15, 20, 25, 30],
                submissions: [10, 20, 30, 40, 50, 60]
            }
        };

        setHistory(sampleData.history);
        setSummary(sampleData.summary);
    }, []);

    const graphData = summary
        ? view === "solved"
            ? [5, 10, 15, 20, 25, 30]
            : [10, 20, 30, 40, 50, 60]
        : [];

    return (
        <div className="progress-page">
            <div className="left-section">
                <h2>Practice History</h2>
                {history.length ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Problem</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.title}</td>
                                    <td className={`status ${item.status === "Accepted" ? "accepted" : "wrong"}`}>
                                        {item.status}
                                    </td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">No submissions available</div>
                )}
            </div>

            <div className="right-section">
                {summary ? (
                    <>
                        <div className="summary">
                            <h2>Total Solved: {summary.solved}</h2>
                            <p>Beats {summary.beats}% users</p>
                            <div className="difficulty-counts">
                                <span>Easy: {summary.easy}</span>
                                <span>Medium: {summary.medium}</span>
                                <span>Hard: {summary.hard}</span>
                            </div>
                        </div>

                        <div className="cards">
                            <div className="card">Total Submissions: {summary.submissions}</div>
                            <div className="card">Acceptance Rate: {summary.acceptance}</div>
                        </div>

                        <div className="graph-section">
                            <div className="graph-header">
                                <div className="btn-group">
                                    <button
                                        className={view === "solved" ? "active" : ""}
                                        onClick={() => setView("solved")}
                                    >
                                        Solved
                                    </button>
                                    <button
                                        className={view === "submissions" ? "active" : ""}
                                        onClick={() => setView("submissions")}
                                    >
                                        Submissions
                                    </button>
                                </div>
                                <div className="dropdowns">
                                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                        {["January", "February", "March", "April", "May", "June"].map((m) => (
                                            <option key={m}>{m}</option>
                                        ))}
                                    </select>
                                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                                        {["2024", "2025"].map((y) => (
                                            <option key={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {graphData.length ? (
                                <div className="bar-graph">
                                    {graphData.map((value, index) => (
                                        <div key={index} className="bar-container">
                                            <div className="bar" style={{ height: `${value * 2}px` }}></div>
                                            <span>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-data">No data available for selected range</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="no-data">No summary data available</div>
                )}
            </div>
        </div>
    );
};

export default ProgressPage;
