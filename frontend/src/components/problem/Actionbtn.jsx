import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsSubmit, setLoading2 } from '../../app/feachers/action.slice'
import { setSubResult } from '../../app/feachers/result/submissionres.slice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ErrorMessage from '../errormessage/ErrorMessage'


function Actionbtn({ code, id, isRun, runData, setLoading }) {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [error, setError] = useState(null)
  const token = useSelector(state => state.token.token)
  const handleRun = async () => {
    setLoading(true)
    try {
      let data = {
        code,
        id
      }
      const res = await fetch("http://127.0.0.1:8000/api/problems/run/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const getData = await res.json()
      runData(getData)
      console.log(getData)
      isRun(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    dispatch(setLoading2(true))
    dispatch(setIsSubmit())
    if (token !== false) {
      try {
        let data = {
          code,
          id
        }
        const res = await fetch("http://127.0.0.1:8000/api/problems/submit/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })
        const getData = await res.json()
        dispatch(setSubResult(getData))
        dispatch(setLoading2(false))
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    else {
      navigator("/user/auth")
    }
  }

  if (error) {
    return <ErrorMessage />
  }
  return (
    <div className="action-buttons">
      <button className="run-btn" onClick={handleRun} disabled={token === false}>Run</button>
      <button className="submit-btn" onClick={handleSubmit} disabled={token === false}>Submit</button>
    </div>
  )
}

export default Actionbtn