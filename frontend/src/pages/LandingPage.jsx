import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="badge">ShareMeal</div>
        <h1>Waste Less. Feed More.</h1>
        <p className="lead">
          ShareMeal connects surplus food with those who need it most — reducing waste, restoring hope, and building stronger communities.
        </p>
        <button className="button ghost" onClick={() => navigate('/register')}>
          Learn how ShareMeal works
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
