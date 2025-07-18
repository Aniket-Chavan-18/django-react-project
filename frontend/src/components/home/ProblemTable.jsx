import { useNavigate, Link } from "react-router-dom";


const ProblemTable = ({ problems }) => {


  const navigator = useNavigate()
  const url = "/problem/private/testcasegenerater/"





  return (
    <table className="problem-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Acceptance</th>
          <th>Difficulty</th>

        </tr>
      </thead>
      <tbody>
        {problems.map((problem, index) => (
          <tr key={problem.id} className="problem-row" onClick={() => {
            navigator(`/problem/${problem.id}`)
          }}>
            <td>{index + 1}</td>
            <td className="problem-title">{problem.title}</td>
            <td>{(problem.acceptance_rate).toFixed(2)}%</td>
            <td>
              <span className={`difficulty-tag ${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProblemTable;