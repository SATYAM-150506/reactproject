import React, { useState } from 'react';
import './Login.css';
import image from './sneakers.webp';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    let valid = true;
    setUsernameError('');
    setEmailError('');
    setPassError('');
    setConfirmPassError('');

    if (username.trim() === '') {
      setUsernameError('Please enter a username.');
      valid = false;
    }

    if (email === '') {
      setEmailError('Email cannot be empty.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address in lowercase.');
      valid = false;
    }

    if (password === '') {
      setPassError('Password cannot be empty.');
      valid = false;
    } else if (password.length < 6) {
      setPassError('Password must be at least 6 characters long.');
      valid = false;
    }

    if (confirmPassword === '') {
      setConfirmPassError('Please confirm your password.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPassError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      const emailExists = await checkUserByEmail(email);
      if (emailExists) {
        alert('Already registered with this email. Please log in.');
      } else {
        const registerResponse = await registerUser(username, email, password);
        if (registerResponse) {
          alert('Successfully registered!');
          fetchData();
        } else {
          alert('Failed to register. Please try again.');
        }
      }
    }
  };

  const checkUserByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      console.log(data); // Handle your data here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 side-image">
            <img src={image} alt="Logo" />
            <div className="text">
              {/* <p>
                Welcome to the shoe's arena <i>- The Shoe Plaza</i>
              </p> */}
            </div>
          </div>
          <div className="col-md-6 right">
            <div className="input-box">
              <header>Create account</header>
              <form onSubmit={validateForm}>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <label>Username</label>
                  {submitted && usernameError && <span className="error-message" style={{color:'red'}}>{usernameError}</span>}
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmail(email.toLowerCase())}
                    required
                    autoComplete="off"
                  />
                  <label>Email</label>
                  {submitted && emailError && <span className="error-message" style={{color:'red'}}>{emailError}</span>}
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
                  {submitted && passError && <span className="error-message" style={{color:'red'}}>{passError}</span>}
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label>Confirm Password</label>
                  {submitted && confirmPassError && <span className="error-message" style={{color:'red'}}>{confirmPassError}</span>}
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Sign Up" />
                </div>
              </form>
              <div className="signin">
                <span>Already have an account? <Link to={"/Login"}>Log in here</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
