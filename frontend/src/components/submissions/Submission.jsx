// SubmissionsPage.jsx
import React, { useEffect, useState } from 'react';
import "../../css/submission.css"
import { useSelector } from 'react-redux'
import Loader from '../Loader';
import AcceptedPageSkeleton from './Accepted/AcceptedPageSkeleton';




const Submissions = ({ id }) => {
    const [statusFilter, setStatusFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [submissionsData, setSubmissionData] = useState([])
    const token = useSelector(state => state.token.token)
    const [isLoggin, setIsLoggedin] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        (async () => {
            setLoading(true)
            if (token !== false) {
                setIsLoggedin(true)
                try {
                    const res = await fetch("http://127.0.0.1:8000/api/problems/submission/notes/" + id, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    const data = await res.json()
                    const filData = data.map((val, index) => {
                        const date = new Date(val.submittedAt);

                        const options = { day: 'numeric', month: 'short', year: 'numeric' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

                        return {
                            status: val.status,
                            language: val.language,
                            runtime: Math.round(val.execution_time * 1000),
                            memory: Math.round(val.memory_use / 1024),
                            notes: val.notes,
                            submittedAt: formattedDate
                        }
                    })
                    setSubmissionData(filData)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }

        })()
    }, [])

    if (loading) return <AcceptedPageSkeleton />



    const filteredSubmissions = submissionsData.filter((sub) => {
        return (
            (statusFilter ? sub.status === statusFilter : true) &&
            (languageFilter.toLowerCase() ? sub.language.toLowerCase() === languageFilter : true)
        );
    });




    return (
        <div className="submissions-container">
            <div className="filters">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value=''>All Statuses</option>
                    <option value='Accepted'>Accepted</option>
                    <option value='Wrong Answer'>Wrong Answer</option>
                    <option value='Compilation Error'>Compilation Error</option>
                    <option value='Runtime Error'>Runtime Error</option>
                </select>
                <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                >
                    <option value='python'>python</option>
                </select>
            </div>

            {filteredSubmissions.length > 0 ? (
                <table className="submissions-table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Language</th>
                            <th>Runtime (ms)</th>
                            <th>Memory (MB)</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((sub, idx) => (
                            <tr key={idx}>
                                <td className={`status ${sub.status.toLowerCase().replace(/ /g, '-')}`}><div className='st-date'>
                                    <div>{sub.status}</div>
                                    <div style={{ color: "white" }}>{sub.submittedAt}</div>
                                </div>
                                </td>
                                <td>{sub.language}</td>
                                <td>{sub.runtime}</td>
                                <td>{sub.memory}</td>
                                <td>{sub.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-data">{isLoggin ? "No submissions found." : "You Need To Login To See Submissions"}</div>
            )}
        </div>
    );



};

export default Submissions;
