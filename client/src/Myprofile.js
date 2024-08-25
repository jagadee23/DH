import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Myprofile = () => {
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/myprofile', {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).then(res => setData(res.data));
    
    axios.get('http://localhost:5000/myreview', {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).then(res => setReview(res.data));
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <nav className="bg-dark p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl">
            <Link to='/'><i className="fas fa-code"></i> Developers Hub</Link>
          </h1>
          <ul className="space-x-4 flex">
            <li><Link to='/myprofile' className="text-white">My Profile</Link></li>
            <li><Link to='/login' className="text-white">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <section className="container mx-auto p-4">
        <Link to="/myprofile" className="btn btn-light mb-4">Back To Profiles</Link>
        {data && 
        <div className="grid gap-4">
          <div className="bg-primary p-4 rounded-lg text-white text-center">
            <img
              className="rounded-full w-32 h-32 mx-auto"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
              alt="Profile"
            />
            <h1 className="text-2xl mt-2">{data.fullname}</h1>
            <p className="text-lg">{data.email}</p>
            <p>India</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl text-primary mb-2">
              <i className="fab fa-github"></i> Reviews and Ratings
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {review.length > 0 ? (
                review.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-2 mb-2">
                    <h4 className="text-lg font-semibold"><Link to="#">{review.taskprovider}</Link></h4>
                    <p>{review.rating}</p>
                  </div>
                ))
              ) : (
                <p>No Review added yet</p>
              )}
            </div>

            <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Enter your reviews</h4>
              <form className="space-y-4" autoComplete="off">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Write your review here"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full p-2 bg-primary text-white rounded-lg">Submit</button>
              </form>
            </div>
          </div>    
        </div>
        }
      </section>
    </div>
  );
};

export default Myprofile;
