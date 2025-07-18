import { useNavigate } from "react-router-dom";
import { setUser } from "../app/feachers/user/userDetails.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser2] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || "no";
    if (token !== "no") {
      (async () => {
        try {
          const res = await fetch("http://127.0.0.1:8000/api/user/profile/", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await res.json();
          setUser2(data);
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    setUser2(null);
    setIsProfileOpen(false);
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload()
  };

  return (
    <nav className="navbar">
      <div className="logo">CodeSphere</div>
      <div className="nav-items">
        <a href="/" className="nav-link">Home</a>
        {user ? (
          <div className="profile-container">
            <button
              className="auth-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              {user.name}
            </button>
            <div className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}>
              <div className="profile-header">{user.name}</div>
              <div className="profile-card">
                <button className="profile-option" onClick={() => navigate("/user/change-password")}>Change password</button>
                <button className="profile-option" onClick={() => navigate("/user/allsubmissions")}>Submissions</button>
              </div>
              <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        ) : (
          <div className="auth-btns" onClick={() => navigate("/user/auth")}>
            <button className="auth-btn" onClick={() => setIsLoggedIn(true)}>Sign In</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
