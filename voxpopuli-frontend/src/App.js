import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import PollPage from './PollPage/PollPage';
import LoginPage from './User/LoginPage';
import RegistrationPage from './User/RegistrationPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Home /> : <Navigate replace to="/login" />} />
                    <Route path="/:id" element={isLoggedIn ? <PollPage /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate replace to="/" />} />
                    <Route path="/register" element={!isLoggedIn ? <RegistrationPage /> : <Navigate replace to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
