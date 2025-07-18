import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState("")
    const [getError, setgetError] = useState("")
    const navigator = useNavigate()

    useState(() => {
        console.log(errors)
    }, [errors])

    const { id, token } = useParams();

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {

            const res = await fetch("http://127.0.0.1:8000/api/user/reset/" + id + "/" + token + "/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const getData = await res.json()
            setMsg(getData.msg)
            navigator("/user/auth/")
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }





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

export default ResetPassword