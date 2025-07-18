import React from "react";
import { useState, useEffect } from "react";

const SubmissionResult = ({
    status = "Accepted", // or "Wrong Answer"
    username = "aniket_17",
    passed = 8,
    total = 8,
    time = 35,
    memory = 12,
    performancePercent = 85,
}) => {
    const [notes, setNotes] = useState("");
    const [animateBars, setAnimateBars] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimateBars(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const statusColor = status === "Accepted" ? "var(--primary-color)" : "var(--danger-color)";

    return (
        <div style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)", padding: "1rem", borderRadius: "12px", fontFamily: "sans-serif", transition: "all 0.3s ease-in-out" }}>
            {/* Top Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid var(--border-color)`, paddingBottom: "0.5rem", opacity: animateBars ? 1 : 0, transform: animateBars ? "translateY(0)" : "translateY(-10px)", transition: "all 0.6s ease" }}>
                <div>
                    <strong>Status:</strong> <span style={{ color: statusColor }}>{status}</span>
                </div>
                <div>
                    <strong>User:</strong> {username}
                </div>
                <div>
                    <strong>Passed:</strong> {passed}/{total}
                </div>
            </div>

            {/* Graph Area */}
            <div style={{ marginTop: "1rem" }}>
                <h3>Performance</h3>
                <div style={{ height: "150px", position: "relative", backgroundColor: "#222", borderRadius: "8px", padding: "1rem", overflow: "hidden" }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, height: animateBars ? `${performancePercent}%` : "0%", width: "25%", backgroundColor: "var(--primary-color)", transition: "height 1s ease" }} title="Faster than X% of users"></div>
                    <div style={{ position: "absolute", bottom: 0, left: "30%", height: animateBars ? `${Math.min(100, time)}%` : "0%", width: "25%", backgroundColor: "var(--secondary-color)", transition: "height 1s ease 0.2s" }} title={`Time: ${time}ms`}></div>
                    <div style={{ position: "absolute", bottom: 0, left: "60%", height: animateBars ? `${Math.min(100, memory)}%` : "0%", width: "25%", backgroundColor: "var(--danger-color)", transition: "height 1s ease 0.4s" }} title={`Memory: ${memory}MB`}></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "0.5rem", opacity: animateBars ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}>
                    <span>Faster%</span>
                    <span>Time</span>
                    <span>Memory</span>
                </div>
            </div>

            {/* Notes Section */}
            <div style={{ marginTop: "1.5rem", opacity: animateBars ? 1 : 0, transform: animateBars ? "translateY(0)" : "translateY(10px)", transition: "all 0.6s ease 0.8s" }}>
                <h3>Your Notes</h3>
                <textarea
                    style={{
                        width: "100%",
                        height: "100px",
                        backgroundColor: "#222",
                        color: "var(--text-color)",
                        border: `1px solid var(--border-color)`,
                        borderRadius: "8px",
                        padding: "0.5rem",
                        resize: "none",
                        transition: "border-color 0.3s ease, background-color 0.3s ease"
                    }}
                    placeholder="Write your thoughts or notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default SubmissionResult;
