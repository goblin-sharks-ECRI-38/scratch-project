import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  const { globalUser, setGlobalUser, appPage, setAppPage } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('navigating...', appPage);
    navigate(appPage);
  }, [globalUser]);

  useEffect(() => {
    console.log('checking if user already logged in...');
    fetch('/verify', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data !== undefined) {
          setGlobalUser(data);
          setAppPage('/feature');
        }
      })
      .catch((err) => {
        // console.log(err);
        // console.log('user not logged in returning to login.');
      });
  }, []);

  const handleChange = (event) => {
    console.log('username before click', username);
    if (event.target.id === 'username') setUsername(event.target.value);
    if (event.target.id === 'password') setPassword(event.target.value);
  };

  const handleSignup = (e) => {
    setLoginError(false);
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('user created:', data);
        setSignUpError(false);
        navigate('/signup')
      })
      .catch((err) => {
        setSignUpError(true);
        console.log(err);
      });
  };

  const handleLogin = (e) => {
    setSignUpError(false);
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('username', data);
        setGlobalUser(data);
        setAppPage('/feature');
        setLoginError(false);
      })
      .catch((err) => {
        setLoginError(true);
        console.log('login error:', err);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  return (
    <div className="loginWrapper">
     
    
    <form onSubmit={handleSubmit} className="loginContainer">
      <h1>Food Remedy</h1>
      <label htmlFor="username">
        <b>Username</b>
        <input id="username" type="text" onChange={handleChange} placeholder="Enter Username" name="username" required />
      </label>

        <label htmlFor='password'>
          <b>Password</b>
          <input
            id='password'
            type='text'
            onChange={handleChange}
            placeholder='Enter Password'
            name='password'
            required
          />
        </label>

      <button
        type="submit"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      <button type="submit" onClick={handleLogin}>
        Login
        {/* { <Link to={
          // if globalUser === '', link to the current page
          // otherwise, link to /feature
          globalUser ? {
            pathname: '/feature',
          } : {
            pathname: '/',
          }
          }
        >
          Login
        </Link> } */}
      </button>

    </form>
    </div>
  );
}
export default Login;
