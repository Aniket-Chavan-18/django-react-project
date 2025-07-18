import { useEffect, useState } from "react";
import "./AllSubmissionsPage.css";
import Nav from "../Nav";
import { useSelector } from 'react-redux';
import Loader from "../Loader"





const AllSubmissionsPage = () => {
    const [month, setMonth] = useState("June");
    const [year, setYear] = useState("2025");
    const [page, setPage] = useState(1);
    const [submissions, setSubmissions] = useState([]);
    const [getDataBackend, setGetDataBackend] = useState(null)
    const [loadPage, setLoadPage] = useState(false)
    const token = useSelector(state => state.token.token)

    const url = "http://127.0.0.1:8000/api/problems/allsubmissions/" + `?${month}&${year}`

    const FetchedData = async (formettedurl) => {
        try {
            setLoadPage(true)
            if (token !== false) {
                const res = await fetch(formettedurl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const getdata = await res.json();
                const formatedData = getdata.results.map((val, index) => {
                    const isoDate = val.submittedAt
                    const date = new Date(isoDate);
                    const options = {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    };

                    const formatted = date.toLocaleString("en-US", options);
                    val.submittedAt = formatted
                    return val
                })
                setSubmissions(formatedData);
                setGetDataBackend(getdata)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadPage(false)
        }
    }
    useEffect(() => {
        // Simulated API call
        FetchedData(url)

    }, [month, year, page]);
    if (loadPage) return <Loader />
    return (
        <>
            <Nav />
            <div className="submissions-page">
                <div className="filter-section">
                    <h2>Filter</h2>
                    <label>
                        Month:
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            {["January", "February", "March", "April", "May", "June"].map((m) => (
                                <option key={m}>{m}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Year:
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            {["2024", "2025"].map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="table-section">
                    <h2>All Submissions</h2>
                    {submissions.length ? (
                        <table className="submission-table">
                            <thead>
                                <tr>
                                    <th>Time Submitted</th>
                                    <th>Question</th>
                                    <th>Status</th>
                                    <th>Runtime</th>
                                    <th>Language</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.submittedAt}</td>
                                        <td>{item.problem.title}</td>
                                        <td className={`status ${item.status === "Accepted" ? "accepted" : "wrong"}`}>
                                            {item.status}
                                        </td>
                                        <td>{Math.round(item.execution_time * 1000)}</td>
                                        <td>{item.language}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data">No submissions found</div>
                    )}

                    <div className="pagination">
                        <button
                            className="page-btn"
                            onClick={() => {
                                if (getDataBackend?.previous) FetchedData(getDataBackend.previous)
                            }}
                            disabled={getDataBackend?.previous === null}
                        >
                            Previous
                        </button>
                        <button
                            className="page-btn"
                            onClick={() => {
                                if (getDataBackend?.next) FetchedData(getDataBackend.next)
                            }}
                            disabled={getDataBackend?.next === null}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AllSubmissionsPage;
