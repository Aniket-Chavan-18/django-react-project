import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Forget() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [msg, setMsg] = useState("")
    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            const res = await fetch("http://127.0.0.1:8000/api/user/sendforgetpasslink/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const getData = await res.json()
            setMsg(getData.msg)
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }

    };


    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <h2>Reset Password</h2>
                <h2>{msg}</h2>
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

                <button type="submit" className="auth-btn" disabled={isSubmitting}>
                    {isSubmitting ? <div className="spinner"></div> : 'Send Email'}
                </button>

            </form>
        </div>
    )
}

export default Forget