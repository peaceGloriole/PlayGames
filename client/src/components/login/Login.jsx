import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useLogin } from '../../hooks/useAuth';
import { useState } from 'react';

const initialValues = { email: ``, password: `` };

export default function Login() {
    const [error, setError] = useState(``);
    const login = useLogin();
    const navigate = useNavigate();

    const loginHandler = async ({ email, password }) => {
        if (!email || !password) {
            setError(`All fields are required!`);
            return;
        }

        try {
            await login(email, password);

            navigate(`/`);
        } catch (error) {
            console.log(error.message);
        }
    }

    const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={submitHandler}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        placeholder="Sokka@gmail.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler} />

                    {error &&
                        <p className="auth error">
                            <span className="error-icon">⚠️</span>
                            <span>{error}</span>
                        </p>
                    }

                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to={"/register"}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}