import { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from "@monaco-editor/react";
import '../../css/problempage.css';
import { useNavigate, useParams } from 'react-router-dom';
import Left from '../problem/Left';
import Output from '../problem/Output';
import Loader from '../Loader';
import Actionbtn from '../problem/Actionbtn';
import { MdFullscreenExit } from "react-icons/md";
import { RxEnterFullScreen } from "react-icons/rx";
import { useSelector } from 'react-redux'
import * as monacoThemes from 'monaco-themes'; // Import all themes
import Monokai from 'monaco-themes/themes/Monokai.json'; // Or any other theme
import NoTestCases from "../testcasesnotfound/NoTestCases"

const ProblemPage = () => {
  const [language, setLanguage] = useState('python');
  const [fontSize, setFontSize] = useState(14);
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [editorCode, setEditorCode] = useState(null);
  const [isClickedRunBtn, setIsClickedRunBtn] = useState(false);
  const [runbtnData, setRunbtnData] = useState(null);
  const [isLoadingRun, setIsLoadingRun] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [prevLeftWidth, setPrevLeftWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [problemNotFound, setProblemNotFound] = useState(false)
  const { id } = useParams();
  const token = useSelector(state => state.token.token)
  console.log(token)
  const containerRef = useRef(null);


  const navigator = useNavigate()


  useEffect(() => {
    const fetchedData = async () => {
      try {
        if (token !== false) {
          const res = await fetch(`http://127.0.0.1:8000/api/problems/problemset/${id}`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const getData = await res.json();
          setProblems(getData.data.problem);
          setEditorCode(getData.data.user_start_code)
          setInputData(getData.data.sample_test);
        }
        else {
          const res = await fetch(`http://127.0.0.1:8000/api/problems/problemset/${id}`, {
            method: 'GET'
          });
          const getData = await res.json();
          setEditorCode(getData.data.user_start_code)
          setProblems(getData.data.problem);
          setInputData(getData.data.sample_test);
        }

      } catch (error) {
        setProblemNotFound(true)
      } finally {
        setLoading(true);
      }
    };
    fetchedData();
  }, []);

  useEffect(() => {
    if (problems && inputData) {
      setLoading(false);
    }
  }, [problems]);

  function handleEditorWillMount(monaco) {
    // Define and set custom theme
    monaco.editor.defineTheme('Monokai', Monokai);
  }


  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = leftWidth;
    const containerWidth = containerRef.current.offsetWidth;

    const onMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;
      let newLeftWidth = startWidth + deltaPercent;

      // Constrain between 20% and 70%
      newLeftWidth = Math.max(20, Math.min(70, newLeftWidth));
      setLeftWidth(newLeftWidth);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setPrevLeftWidth(leftWidth);
      setIsFullscreen(true);
    } else {
      setLeftWidth(prevLeftWidth);
      setIsFullscreen(false);
    }
  };
  console.log(editorCode)

  if (problemNotFound) return <NoTestCases />


  if (loading) return <Loader />;


  return (
    <div
      className={`container ${isFullscreen ? 'fullscreen-editor' : ''}`}
      ref={containerRef}
      data-resizing={isResizing}
      style={{ '--left-width': `${leftWidth}%` }}
    >

      {!isFullscreen && (
        <>
          <div
            className="left-panel"
            style={{ width: `${leftWidth}%` }}
          >
            <Left
              sampleProblem={problems}
              openSection={openSection}
              setOpenSection={setOpenSection}
              code={editorCode}
              setStarterCode={setEditorCode}
              id={id}
              isNarrow={leftWidth < 30}
            />
          </div>
          <div
            className="resizer"
            onMouseDown={handleMouseDown}
            style={{ left: `calc(${leftWidth}% - 3px)` }} // 3px centers the 6px resizer
            data-testid="resizer"
          />
        </>
      )}


      {token === false ? <div style={{
        width: "100%",
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 29
      }}>


        <h1 style={{ textAlign: 'center' }}>You need to Login To Solve Problem</h1>
        <button className="submit-btn" style={{ fontSize: 30, width: '30%' }}
          onClick={() => navigator("/user/auth")}
        >Login</button>
      </div> :
        <div
          className="right-panel"
          style={{ width: isFullscreen ? '100%' : `${100 - leftWidth}%` }}
        >
          <div className="editor-header">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="python">Python</option>
            </select>

            <div className="font-controls">
              <button onClick={() => setFontSize(f => Math.max(12, f - 1))}>-</button>
              <span>{fontSize}</span>
              <button onClick={() => setFontSize(f => f + 1)}>+</button>
            </div>




            <Actionbtn
              code={editorCode}
              id={id}
              isRun={setIsClickedRunBtn}
              runData={setRunbtnData}
              setLoading={setIsLoadingRun}
            />

            <div className="fullscreen-btn" onClick={toggleFullscreen}>
              {isFullscreen ? <MdFullscreenExit /> : <RxEnterFullScreen />}
            </div>
          </div>

          <Editor
            height={isFullscreen ? "92vh" : "60vh"}
            language={language}
            value={editorCode}
            beforeMount={handleEditorWillMount}
            theme="Monokai"
            options={{
              fontSize,
              fontFamily: 'JetBrains Mono',
              minimap: { enabled: false },
              automaticLayout: true,
              bracketPairColorization: { enabled: true },
              matchBrackets: 'always',
            }}
            onChange={(val) => setEditorCode(val)}
          />

          {!isFullscreen && (
            <Output
              inputData={inputData}
              isRun={isClickedRunBtn}
              runData={runbtnData}
              loading={isLoadingRun}
              setLoading={setIsLoadingRun}
            />
          )}

        </div>
      }
    </div>
  );
};

export default ProblemPage;

