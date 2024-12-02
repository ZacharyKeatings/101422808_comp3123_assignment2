import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>COMP3123 - Assignment 2</h1>
      <p>This is the tagline for Assignment 2</p>
      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;