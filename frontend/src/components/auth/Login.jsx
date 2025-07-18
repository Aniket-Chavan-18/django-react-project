import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { setUser } from '../../app/feachers/user/userDetails.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../app/feachers/user/token';
import { Link } from 'react-router-dom';

const Login = ({ switchToSignup }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [getError, setgetError] = useState("")
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    // Simulate API call
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/login/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const get_data = await res.json()
      if ("error" in get_data) {
        setgetError(get_data.error)
      }
      else {
        localStorage.setItem('access_token', get_data.token.access)
        dispatch(setUser(get_data.user))
        dispatch(setToken(get_data.token.access))
        setgetError("")
        navigator("/")
      }
      console.log(get_data)
    } catch (error) {
      console.log('error')
    } finally {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>Welcome Back</h2>
        <h3 style={{ color: "red", padding: 5 }}>{getError}</h3>
        <div className="form-group">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <button type="submit" className="auth-btn" disabled={isSubmitting}>
          {isSubmitting ? <div className="spinner"></div> : 'Login'}
        </button>
        <p className="switch-mode">
          <Link to="/user/forget-password" style={{ color: "red" }}  >forget Password</Link>
        </p>
        <p className="switch-mode">
          Don't have an account?{' '}
          <span onClick={switchToSignup}>Sign up here</span>
        </p>
      </form>
    </div>
  );
};

export default Login