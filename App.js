// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Default route to Home */}
                <Route path="/login" element={<Login />} /> {/* Route to Login */}
                <Route path="/signup" element={<Signup />} /> {/* Route to Signup */}
            </Routes>
        </Router>
    );
};

export default App;