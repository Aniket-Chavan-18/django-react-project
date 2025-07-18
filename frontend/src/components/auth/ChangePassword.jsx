
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function ChangePassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState("")
    const [getError, setgetError] = useState("")
    const token = useSelector(state => state.token.token)
    useState(() => {
        console.log(errors)
    }, [errors])

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            if (token !== false) {
                const res = await fetch("http://127.0.0.1:8000/api/user/reset/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                })
                const getData = await res.json()
                setMsg(getData.msg)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    setTimeout(() => {
        setMsg("")
    }, (2000));



    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <h2>Change Password</h2>
                <h3 style={{ color: "red", padding: 5 }}>{getError}</h3>
                <h2>{msg}</h2>
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
                    {isSubmitting ? <div className="spinner"></div> : 'Reset Password'}
                </button>


            </form>
        </div>
    );
}

export default ChangePassword