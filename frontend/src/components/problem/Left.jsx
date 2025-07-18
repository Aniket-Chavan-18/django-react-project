import React, { useEffect, useRef, useState } from 'react';
import Submission from '../submissions/Submission';
import { useSelector, useDispatch } from 'react-redux';
import SubmissionResult from '../submissions/SubmissionResult';
import { RxCross2 } from 'react-icons/rx';
import { setIsSubmit } from '../../app/feachers/action.slice';
import { setActiveTab } from '../../app/feachers/switchTab';
import WrongAnswer from '../submissions/WrongAnswer';
import RuntimeError from '../submissions/RuntimeError';
import AcceptedPage from '../submissions/Accepted/AcceptedPage';
import TimeLimitExceeded from '../submissions/TimeLimitExceeded';
import Submissions from '../submissions/Submission';
import AcceptedPageSkeleton from '../submissions/Accepted/AcceptedPageSkeleton';

function Left({ sampleProblem, openSection, setOpenSection, code, setStarterCode, id }) {
  const isSubmitted = useSelector((state) => state.submit.isSubmit);
  const subResult = useSelector((state) => state.result.subResult.user_output);
  const loadingSubmit = useSelector(state => state.submit.loading)
  const calculations = useSelector((state) => state.result.subResult.calcuations)
  const activeTab = useSelector((state) => state.switchTab.activeTab)
  const dispatch = useDispatch();
  const btnref = useRef(null)
  const [loadingResult, setLoadingResult] = useState(false);


  // ✅ Automatically switch to result tab on submit
  useEffect(() => {
    if (isSubmitted && subResult?.status) {
      setLoadingResult(true);
      // delay to simulate fetching/loading
      const timer = setTimeout(() => {
        dispatch(setActiveTab(subResult.status));
        setLoadingResult(false);
      }, 800); // fast shimmer

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, subResult?.status]);

  useEffect(() => {
    if (loadingSubmit == true) {
      dispatch(setActiveTab("loading"))

    }
  }, [loadingSubmit])


  const handleCloseResultTab = () => {
    setTimeout(() => {
      dispatch(setActiveTab('submission'));
    }, 50);

    console.log(activeTab)
    dispatch(setIsSubmit(false));
  };



  return (
    <div className="left-panel">
      <div className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => dispatch(setActiveTab('problem'))}
        >
          Problem
        </button>

        <button
          className={activeTab === 'submission' ? 'active' : ''}
          onClick={() => dispatch(setActiveTab('submission'))}
          ref={btnref}
        >
          Submission
        </button>

        {loadingSubmit ? <button
          className={activeTab === 'loading' ? 'active' : ''}
          onClick={() => dispatch(setActiveTab('loading'))}
        >
          Loading...
        </button> : isSubmitted && (<button
          className={activeTab === subResult?.status ? 'active' : ''}
          onClick={() => dispatch(setActiveTab(subResult?.status))}
          disabled={loadingResult}
        >
          <span
            style={{
              color: loadingResult
                ? '#999'
                : subResult?.status === 'Accepted'
                  ? 'green'
                  : 'red',
              marginRight: 8
            }}
          >
            {subResult?.status}

          </span>
          {(
            <span onClick={handleCloseResultTab} style={{ cursor: 'pointer' }}>
              <RxCross2 />
            </span>
          )}
        </button>)}



      </div>

      {/* Render tab content */}

      {activeTab === 'problem' && (
        <div className="problem-content">
          <h1>{sampleProblem.title}</h1>
          <p style={{ whiteSpace: 'pre-line' }}>{sampleProblem.description}</p>

          <div className="expandable-section">
            <button
              className="section-header"
              onClick={() =>
                setOpenSection(openSection === 'companies' ? null : 'companies')
              }
            >
              Asked By Companies
            </button>
            <div
              className={`section-content ${openSection === 'companies' ? 'open' : ''
                }`}
            >
              {sampleProblem.companies.split(',').map((company) => (
                <span key={company} className="company-tag">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'submission' && <Submission id={id} />}


      {activeTab === 'loading' ? <AcceptedPageSkeleton /> :

        isSubmitted && activeTab === subResult?.status && (
          loadingResult ? (
            <AcceptedPageSkeleton />
          ) : subResult.status === 'Wrong Answer' ? (
            <WrongAnswer result={subResult} id={id} />
          ) : subResult.status === 'Accepted' ? (
            <AcceptedPage result={subResult} setCode={setStarterCode} calcuations={calculations} id={id} />
          ) : subResult.status === 'Runtime Error' ? (
            <RuntimeError result={subResult} id={id} />
          ) : subResult.status === 'Time Limit Exceeded' ? (
            <TimeLimitExceeded result={subResult} id={id} />
          ) : null
        )}

    </div>
  );
}

export default Left;
