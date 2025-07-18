import React, { useEffect, useState } from 'react'
import Nav from '../Nav'
import ProblemTable from '../home/ProblemTable'

function DsaSheets() {
    const [problems, setProblems] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch("http://127.0.0.1:8000/api/problems/problemset/?tag=dsa sheet")
            const data = await res.json()
            setProblems(data.results)
        })()
    }, [])
    return (
        <>
            <Nav />
            <ProblemTable problems={problems} />
        </>
    )
}

export default DsaSheets