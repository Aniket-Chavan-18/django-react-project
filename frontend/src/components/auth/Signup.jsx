// AuthForms.jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/feachers/user/userDetails.slice';
import { setToken } from '../../app/feachers/user/token';

const SignUp = ({ switchToLogin }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
  const [getError, setgetError] = useState("")

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data)
    // Simulate API call
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/ragister/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const get_data = await res.json()
      console.log(get_data)
      if ("error" in get_data) {
        setgetError(get_data.error.email[0])
      }
      else {
        localStorage.setItem('access_token', get_data.token.access)
        dispatch(setUser(get_data.user))
        dispatch(setToken(get_data.token.access))
      }
    } catch (error) {
      console.log('error')
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>Create Account</h2>
        <h3 style={{ color: "red", padding: 5 }}>{getError}</h3>
        <div className="form-group">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

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
            {...register("collage_name", { required: "College name is required" })}
            placeholder="College Name"
            className={errors.college ? 'error' : ''}
          />
          {errors.college && <span className="error-message">{errors.college.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            placeholder="Password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            {...register("pass2", {
              validate: value => value === watch('password') || "Passwords do not match"
            })}
            placeholder="Confirm Password"
            className={errors.pass2 ? 'error' : ''}
          />
          {errors.pass2 && (
            <span className="error-message">{errors.pass2.message}</span>
          )}
        </div>

        <button type="submit" className="auth-btn" disabled={isSubmitting}>
          {isSubmitting ? <div className="spinner"></div> : 'Sign Up'}
        </button>

        <p className="switch-mode">
          Already have an account?{' '}
          <span onClick={switchToLogin}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;