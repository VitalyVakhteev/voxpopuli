import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { username, password, confirmPassword });
            if (response.status === 200) {
                navigate('/login');
            }
            else if (response.data === "Passwords do not match") {
                setErrorMessage("Passwords do not match. Please try again.");
            }
            else if (response.data === "Username already exists") {
                setErrorMessage("Username already exists. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleRegistration}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;