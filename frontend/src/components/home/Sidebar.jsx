import DSASheetCard from "../cards/DSASheetCard";

const Sidebar = ({ selectedDifficulties, toggleDifficulty }) => (
  <div className="sidebar">
    <h3>Filter by Difficulty</h3>
    {['Easy', 'Medium', 'Hard'].map(difficulty => (
      <label key={difficulty} className="difficulty-filter">
        <input
          type="checkbox"
          checked={selectedDifficulties.includes(difficulty)}
          onChange={() => toggleDifficulty(difficulty)}
        />
        <span className={`difficulty-tag ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </label>
    ))}

    <DSASheetCard
      title="Striver's DSA Sheet"
      slogan="Master DSA one pattern at a time!"
      link="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
    />
  </div>
);

export default Sidebar;