import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Header() {
    const { isAuthenticated, email } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <Link className="home" to="/">GamesPlay</Link>
            </h1>
            <nav>
                <h4>Welcome, {email}</h4>
                <Link to="/games">All games</Link>

                {isAuthenticated ? (
                    <div id="user">
                        <Link to="/games/create">Create Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                ) : (

                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}