import React, { useState } from 'react';
import './Login.css';
import image from './sneakers.webp'; // Ensure the correct path to image

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    };

    const validateFields = () => {
        let emailErr = '';
        let passErr = '';

        if (email === '') {
            emailErr = "Email cannot be empty.";
        } else if (!validateEmail(email)) {
            emailErr = "Please enter a valid email address.";
        }

        if (password === '') {
            passErr = "Password cannot be empty.";
        } else if (password.length < 6) {
            passErr = "Password must be at least 6 characters long.";
        }

        setEmailError(emailErr);
        setPassError(passErr);

        return emailErr === '' && passErr === '';
    };

    const checkUser = async (email, password) => {
        try {
            let response = await fetch(`http://localhost:3000/users?email=${email}`);
            let data = await response.json();
            return data.length > 0 && data[0].password === password;
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        
        if (validateFields()) {
            const userExists = await checkUser(email, password);
            if (userExists) {
                alert("Login successful!");
                window.location.href = "homepage.html"; // Redirect to homepage
            } else {
                alert("Invalid email or password. Please try again.");
            }
        } 
    };

    return (
        <div className="wrapper">
            <div className="container main">
                <div className="row">
                    <div className="col-md-6 side-image">
                        <img src={image} alt="Sneakers" />
                        <div className="text">
                            {/* <p>Welcome to the shoe's arena <i>- The Shoe Plaza</i></p> */}
                        </div>
                    </div>
                    <div className="col-md-6 right">
                        <div className="input-box">
                            <form onSubmit={handleLogin}>
                                <header>Login!</header>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="off"
                                    />
                                    <label>Email</label>
                                    {submitted && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        className="input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label>Password</label>
                                    {submitted && passError && <div style={{ color: 'red' }}>{passError}</div>}
                                </div>
                                <div className="input-field">
                                    <input type="submit" className="submit" value="Login" />
                                </div>
                                <div className="signin">
                                    <span>New customer <a href="signup.html">Sign up now!</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
