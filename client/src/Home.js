import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav className="bg-dark p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/' className="text-white text-xl">
            <i className="fas fa-code"></i> Developers Hub
          </Link>
          <div className="space-x-4">
            <Link to="/register" className="text-white">Register</Link>
            <Link to="/login" className="text-white">Login</Link>
          </div>
        </div>
      </nav>

      <section className="landing flex items-center justify-center h-screen bg-cover" style={{ backgroundImage: 'url(https://your-image-url.jpg)' }}>
        <div className="bg-opacity-60 bg-black w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold">Developers Hub</h1>
            <p className="text-lg md:text-2xl mt-4">
              Create a developer profile/portfolio, share posts, and get help from other developers
            </p>
            <div className="mt-6 space-x-4">
              <Link to="/register" className="btn-primary">Sign Up</Link>
              <Link to="/login" className="btn-secondary">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
