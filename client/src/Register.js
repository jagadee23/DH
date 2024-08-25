import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    skill: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', data);

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        navigate('/login'); // Redirect to login page upon success
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <nav className="bg-dark p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl">
            <Link to="/"><i className="fas fa-code"></i> Developers Hub</Link>
          </h1>
          <ul className="space-x-4 flex">
            <li><Link to="/register" className="text-white">Register</Link></li>
            <li><Link to="/login" className="text-white">Login</Link></li>
          </ul>
        </div>
      </nav>

      <section className="container mx-auto p-4">
        <h1 className="text-3xl text-primary mb-4">Sign Up</h1>
        <p className="text-lg mb-4"><i className="fas fa-user"></i> Create Your Account</p>
        
        {error && <div className="mb-4 text-red-600">{error}</div>}
        
        <form className="space-y-4" onSubmit={submitHandler} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={data.fullname}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={data.email}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mobile No"
              name="mobile"
              value={data.mobile}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Skill"
              name="skill"
              value={data.skill}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <input type="submit" className="btn btn-primary w-full p-2 bg-primary text-white rounded-lg" value="Register" />
        </form>
        <p className="my-4">
          Already have an account? <Link to="/login" className="text-primary">Sign In</Link>
        </p>
      </section>
    </>
  );
};

export default Register;
