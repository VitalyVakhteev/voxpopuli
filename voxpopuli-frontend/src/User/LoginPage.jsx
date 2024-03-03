import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { username, password });
            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUsername', username);
                setIsLoggedIn(true);
                navigate('/');
            }
        } catch (error) {
            setErrorMessage("Login failed. Please check your username and password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <p style={{color: 'blue', marginTop: "20px"}}> Don't have an account? <Link to="/register">Register</Link></p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
