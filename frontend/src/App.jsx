import { useEffect, useState, useRef } from 'react';
import Nav from './components/Nav';
import Sidebar from './components/home/Sidebar';
import ProblemTable from './components/home/ProblemTable';
import Pagination from './components/home/Pagination';
import Loader from './components/Loader';
import Footer from './components/footer/Footer';
import './App.css';

const BASE_URL = 'http://127.0.0.1:8000/api/problems/problemset/';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [problemData, setProblemData] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(BASE_URL);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef(null);

  // Focus search input on load
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update currentUrl when debounced search changes
  useEffect(() => {
    const url = `${BASE_URL}?search=${debouncedSearch}`;
    setCurrentUrl(url);
    setPage(1);
  }, [debouncedSearch]);

  // Fetch problems from API
  useEffect(() => {
    const isSearch = currentUrl.includes('search=') && debouncedSearch !== '';

    // Only show loading spinner if it's NOT a search
    if (!isSearch) setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(currentUrl);
        const data = await res.json();
        setProblemData(data.results || []);
        setPrevious(data.previous);
        setNext(data.next);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        if (!isSearch) setLoading(false);
      }
    };

    fetchData();
  }, [currentUrl, debouncedSearch]);

  // Filter by difficulty
  const filteredProblems = problemData.filter(problem =>
    selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty)
  );

  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  return (
    <div className="app">
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {loading ? (
        <Loader />
      ) : (
        <div className="main-content">
          <Sidebar
            selectedDifficulties={selectedDifficulties}
            toggleDifficulty={toggleDifficulty}
          />

          <div className="content">
            <div className="search-container">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ProblemTable problems={filteredProblems} />

            <Pagination
              previous={previous}
              next={next}
              setCurrentUrl={setCurrentUrl}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
