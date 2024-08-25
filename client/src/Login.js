import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setLoggedIn(true);
      })
      .catch(err => {
        console.error('Login error:', err);
      });
  };

  if (loggedIn || localStorage.getItem('token')) {
    navigate('/dashboard');
    return null;
  }

  return (
    <>
      {/* Fixed Header with Right-Aligned Links */}
      <nav className="bg-dark p-4 fixed top-0 left-0 w-full z-10 flex justify-between items-center">
        <h1 className="text-xl" style={{ color: 'white' }}>
          <Link to="/"><i className="fas fa-code"></i> Developers Hub</Link>
        </h1>
        <ul className="flex space-x-4">
          <li><Link to="/register" className="text-white">Register</Link></li>
          <li><Link to="/login" className="text-white">Login</Link></li>
        </ul>
      </nav>

      {/* Centered Form Section */}
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-16">
          <h1 className="text-3xl text-center mb-6 text-primary">Sign In</h1>
          <p className="text-center text-gray-600 mb-4"><i className="fas fa-user"></i> Sign into Your Account</p>
          <form className="space-y-4" onSubmit={submitHandler} autoComplete="off">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={changeHandler}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={changeHandler}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <input type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" value="Login" />
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <Link to="/register" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
