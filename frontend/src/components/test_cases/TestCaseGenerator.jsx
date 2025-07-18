import React, { useEffect, useState } from 'react';
import './TestCaseGenerator.css';
import { IconContext } from "react-icons";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Loader2 from '../Loader2';
import { useNavigate, Link } from 'react-router-dom';

const TestCaseGenerator = () => {
    const [id, setId] = useState(1814)
    const [des, setDes] = useState("")
    const [users, setusers] = useState("")
    const [userh, setUserh] = useState("")
    const [loading, setLoading] = useState(false)
    const [aiRes, setAiRes] = useState("")
    const [addb, setAddb] = useState("")
    const navigator = useNavigate()

    const lefthand = () => {
        if (id > 1814) setId(id - 1)
    }
    const righthand = () => {
        if (id < 3638) setId(id + 1)
    }


    useEffect(() => {
        (async () => {
            const fetchedData = await fetch("http://127.0.0.1:8000/api/problems/private/testcases/" + id)
            const res = await fetchedData.json()
            setDes(res.des)
            setusers(res.user_start_code)
            setUserh(res.user_hidden_code)

        })()
    }, [id])

    const generateHand = async () => {
        setLoading(true)
        const data = {
            des: des,
            user_start_code: users,
            user_hidden_code: userh,
            id: id
        }
        try {
            const fetchedData = await fetch("http://127.0.0.1:8000/api/problems/private/testcases/1812", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const res = await fetchedData.json()
            const str = res.ai
            setAiRes(str)
            setAddb(res.jai)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    const addBackend = async () => {
        setLoading(true)

        try {
            const data = {
                ai: addb,
                id: id
            }
            console.log(id)
            const fetchedData = await fetch("http://127.0.0.1:8000/api/problems/private/testcases/add/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const res = await fetchedData.json()
            console.log("done")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const url = "/problem/"

    return (
        <div className="testcase-container">
            <div className="top">
                <button className="left" onClick={lefthand}>
                    <IconContext.Provider value={{ color: "pink", className: "global-class-name", size: 25 }}>
                        <FaArrowLeft />
                    </IconContext.Provider>;
                </button>
                <h2><Link to={url + id}>id : {id}</Link></h2>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <button className="right" onClick={righthand}>
                    <IconContext.Provider value={{ color: "pink", className: "global-class-name", size: 25 }}>
                        <FaArrowRight />
                    </IconContext.Provider></button>
            </div>
            <div className="top-sections">
                <div className="section left">
                    <h2>Problem Description</h2>
                    <textarea placeholder="Enter problem description..." className="textarea"
                        value={des}
                    />

                    <h3>user hidden code</h3>
                    <textarea placeholder="Sample Input/Output" className="textarea"
                        value={userh}
                    />

                    <h3>user starter code</h3>
                    <textarea placeholder="Sample Input/Output" className="textarea"
                        value={users}
                    />

                    <button className="generate-btn" onClick={generateHand}>Generate Test Cases</button>
                </div>

                <div className="section middle">
                    <h2>AI Response</h2>
                    <div className="response-box">
                        {/* Replace with actual response */}
                        {loading ? <Loader2 /> :
                            <p>{`${aiRes}`}</p>
                        }
                    </div>
                </div>

                <div className="section right">
                    <h2>Extracted JSON</h2>
                    <div className="json-box">
                        {/* Replace with parsed JSON */}
                        <pre>{aiRes}</pre>
                        <button className="generate-btn" style={{ width: "100%" }} onClick={addBackend}>Add to Backend</button>
                    </div>

                </div>
            </div>

            <div className="bottom-section">
                <input
                    type="text"
                    placeholder="Ask AI to modify something..."
                    className="input-modify"
                />
                <button className="generate-btn">Send</button>
            </div>
        </div>
    );
};

export default TestCaseGenerator;
