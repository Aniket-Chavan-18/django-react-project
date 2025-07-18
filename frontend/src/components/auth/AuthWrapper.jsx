// App.jsx
import { useState } from 'react';
import SignUp from './Signup';
import Loader from '../Loader';
import Nav from '../Nav';
import Login from './Login';
import '../../css/AuthForms.css';

const AuthWrapper = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="app">
      <Nav/>
      {showLogin ? (
        <Login switchToSignup={() => setShowLogin(false)} />
      ) : (
        <SignUp switchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default AuthWrapper