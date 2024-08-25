import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Indprofile = ({ match }) => {
  const [rating, setRating] = useState('');
  const [taskprovider, setTaskprovider] = useState(null);
  const [review, setReview] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the user's profile data to display on the page
    axios.get(`http://localhost:5000/indprofile/${match.params.id}`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => {
      setData(res.data);
    });

    // Fetch existing reviews for the user
    axios.get('http://localhost:5000/reviews', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => {
      setReview(res.data);
    });
  }, [match.params.id]);

  const submitHandler = e => {
    e.preventDefault();
    axios.get('https://localhost:5000/myprofile', {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => {
      setTaskprovider(res.data.fullname);
    });

    let newReview = {
      taskprovider,
      taskworker: match.params.id,
      rating,
    };

    axios.post('http://localhost:5000/addreview', newReview, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    }).then(res => alert(res.data));
  };

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
          <div className="profile-grid gap-4">
            <div className="profile-top bg-primary p-4 rounded-lg text-white text-center">
              <img
                className="rounded-full w-32 h-32 mx-auto"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"
                alt="Profile"
              />
              <h1 className="text-2xl mt-2">{match.params.fullname}</h1>
              <p className="text-lg">{match.params.email}</p>
              <p>India</p>
            </div>

            <div className="profile-github mt-4">
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
                <form className="space-y-4" autoComplete="off" onSubmit={submitHandler}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Write your review here"
                      name="rating"
                      onChange={e => setRating(e.target.value)}
                      required
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
}

export default Indprofile;
