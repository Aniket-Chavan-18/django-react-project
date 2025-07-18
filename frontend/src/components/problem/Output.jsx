import React, { useEffect, useState, useRef } from 'react'
import Loader2 from '../Loader2'

function Output({ inputData, isRun, runData, loading, setLoading }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [verdicts, setVerdicts] = useState([])
  const firstButtonRef = useRef(null)

  useEffect(() => {
    if (firstButtonRef.current) {
      firstButtonRef.current.click()
    }
  }, [runData])

  useEffect(() => {
    if (runData !== null) {
      const stdoutArray = runData.user_out[0].stdout || []
      const stderr = runData.user_out[0].stderr || ""
      const results = runData.user_out[1].map((testcase, idx) => {
        const userOutput = stdoutArray[idx]
        const expectedOutput = testcase.expected_output
        setLoading(false)
        if (stderr && stderr.trim() !== "") return "error"
        if (JSON.stringify(userOutput) === JSON.stringify(expectedOutput)) return "accepted"
        return "wrong"
      })
      setVerdicts(results)
    }
  }, [runData])

  const getOutputView = () => {
    const testcases = isRun && runData ? runData.user_out[1] : inputData
    const testcase = testcases[selectedIndex] || {}

    const input = testcase.input ?? ''
    const expected = testcase.expected_output ?? 'N/A'
    const stderr = runData?.user_out[0]?.stderr || ""
    const stdout = runData?.user_out[0]?.stdout || []
    const userOutput = stdout[selectedIndex] ?? 'N/A'

    const verdict = verdicts[selectedIndex]

    return (
      <pre className="output-content">
        {verdict === "error" && <h3 style={{ color: 'red' }}>Error</h3>}
        {verdict === "wrong" && <h3 style={{ color: 'red' }}>Wrong Answer</h3>}
        {verdict === "accepted" && <h3 style={{ color: 'green' }}>Accepted</h3>}

        {/* Input */}
        <div><strong>Input:</strong></div>
        {typeof input === "object" ? (
          Object.entries(input).map(([key, val], idx) => (
            <div key={idx}>{key} : {Array.isArray(val) ? `[${val.join(", ")}]` : val}</div>
          ))
        ) : (
          <div>{input}</div>
        )}

        {/* User Output */}
        <strong >Your Output:</strong>{" "}
        <span style={{color : verdict === "wrong" ? 'red' : 'green'}}>
          {stderr.trim() !== "" ? (
            <span style={{ color: 'red' }}>{stderr}</span>
          ) : (
            Array.isArray(userOutput)
              ? `[${userOutput.join(", ")}]`
              : String(userOutput)
          )}
        </span>

        {/* Expected Output */}
       
        <div >
           <strong>Expected Output:</strong>{" "}
            <span style={{color : 'green'}}>
               {Array.isArray(expected)
            ? `[${expected.join(", ")}]`
            : String(expected)}
            </span>
        </div>
      </pre>
    )
  }

  const getButtonStyle = (index) => {
    if (!isRun || !runData) {
      return {
        backgroundColor: selectedIndex === index ? '#2ecc71' : '#1a1a1a',
        color: 'white'
      }
    }

    const status = verdicts[index]
    let bg = '#1a1a1a'

    if (status === "accepted") bg = 'green'
    else if (status === "wrong" || status === "error") bg = 'red'

    return {
      backgroundColor: selectedIndex === index ? bg : '#1a1a1a',
      color: 'white',
      border: selectedIndex === index ? '2px solid white' : 'none'
    }
  }

  return (
    <div className="output-section">
      <div className="testcase-buttons">
        {(isRun && runData ? runData.user_out[1] : inputData).map((_, index) => (
          <button
            key={index}
            ref={index === 0 ? firstButtonRef : null}
            onClick={() => setSelectedIndex(index)}
            style={getButtonStyle(index)}
          >
            Test Case {index + 1}
          </button>
        ))}
      </div>

      {loading  ? <Loader2 /> : getOutputView()}
    </div>
  )
}

export default Output
