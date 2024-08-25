import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/allprofiles', {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    })
    .then(res => setData(res.data))
    .catch(err => {
      console.error('Error fetching data:', err);
      setError('Network Error. Please try again later.');
    });
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <nav className="bg-dark p-4">
        <ul className="flex space-x-4">
          <li><Link to="/myprofile" className="text-white">Developers</Link></li>
          <li><Link to="/login" onClick={() => localStorage.removeItem('token')} className="text-white">Logout</Link></li>
        </ul>
      </nav>

      <section className="container mx-auto p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-primary">Developers</h1>
        <p className="text-lg md:text-xl">
          <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="profiles space-y-4">
          {error ? (
            <h4>{error}</h4>
          ) : data.length >= 1 ? (
            data.map(profile => (
              <div className="profile bg-light p-4 rounded" key={profile._id}>
                <img
                  className="rounded-full w-16 h-16"
                  src={profile.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200"}
                  alt=""
                />
                <div>
                  <h2 className="text-xl">{profile.fullname}</h2>
                  <p>{profile.email}</p>
                  <p>{profile.mobile}</p>
                  <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className="btn-primary mt-2">View Profile</Link>
                </div>
                <ul className="space-y-1 mt-2">
                  {profile.skill.map((skill, index) => (
                    <li key={index} className="text-primary">
                      <i className="fa fa-check"></i> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <h4>No profiles found...</h4>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
