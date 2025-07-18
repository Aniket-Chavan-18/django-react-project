// Pagination.jsx
const Pagination = ({ previous, next, setCurrentUrl, page, setPage }) => {
  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => {
          if (previous) {
            setCurrentUrl(previous);
            setPage(page - 1);
          }
        }}
        disabled={!previous}
      >
        Previous
      </button>

      <span>Page {page} of 37</span>

      <button
        className="page-btn"
        onClick={() => {
          if (next) {
            setCurrentUrl(next);
            setPage(page + 1);
          }
        }}
        disabled={!next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
