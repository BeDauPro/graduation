import React, { useState } from 'react';
import WelcomePage from './Components/WelcomePage';
import InvitationPage from './Components/InvitationPage';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageTransition = (pageNumber) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="app">
      <div className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
        {currentPage === 0 && (
          <WelcomePage onNavigate={() => handlePageTransition(1)} />
        )}
        {currentPage === 1 && (
          <InvitationPage onNavigate={() => handlePageTransition(0)} />
        )}
      </div>
    </div>
  );
};

export default App;