import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

const initialValues = { email: ``, password: ``, repassword: `` };

export default function Register() {
    const [error, setError] = useState(``);
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async ({ email, password, repassword }) => {
        if (!email || !password || !repassword) {
            setError(`All fields are required!`);
            return;
        }

        if (password !== repassword) {
            setError(`Passwords do not match!`);
            return;
        }

        try {
            await register(email, password, repassword);

            navigate(`/`);
        } catch (error) {
            setError(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(
        initialValues,
        registerHandler
    );

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={submitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        placeholder="maria@email.com" />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        id="register-password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="repassword"
                        value={values.repassword}
                        onChange={changeHandler}
                        id="confirm-password" />

                    {error &&
                        <p className="auth error">
                            <span className="error-icon">⚠️</span>
                            <span>{error}</span>
                        </p>
                    }

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to={"/login"}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}