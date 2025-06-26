import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import FloatingParticles from './FloatingParticles';

const WelcomePage = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    // Chỉ áp dụng hiệu ứng chuột trên desktop
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Cải thiện hiệu ứng slide cho mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!buttonRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartX.current;
    
    if (diffX > 0 && diffX < 200) {
      buttonRef.current.style.transform = `translateX(${diffX}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!buttonRef.current) return;
    
    const currentX = e.changedTouches[0].clientX;
    const diffX = currentX - touchStartX.current;
    
    if (diffX > 150) {
      // Slide thành công
      buttonRef.current.style.transform = 'translateX(200px)';
      setTimeout(() => {
        onNavigate();
      }, 200);
    } else {
      // Quay về vị trí ban đầu
      buttonRef.current.style.transform = 'translateX(0px)';
    }
  };

  const handleButtonClick = () => {
    setIsButtonPressed(true);
    setTimeout(() => {
      onNavigate();
    }, 400);
  };

  return (
    <div 
      ref={containerRef}
      className="welcome-page"
      style={{
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y
      }}
    >
      <FloatingParticles />
      
      {/* Animated background grid */}
      <div className="background-grid" />

      {/* 3D floating elements */}
      <div className="floating-elements">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`floating-orb floating-orb-${i + 1}`}
            style={{
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="content-container">
        {/* Main title */}
        <div className="title-section">
          <h1 className="main-title">
            GRADUATION
          </h1>
          <h2 className="sub-title">
            CELEBRATION 2025
          </h2>
          <div className="title-dots">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="dot"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        {/* Slide to unlock button */}
        <div className="slide-container">
          <div className="slide-track">
            <div className="slide-background" />
            
            <button
              ref={buttonRef}
              className={`slide-button ${isButtonPressed ? 'pressed' : ''}`}
              onClick={handleButtonClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <ChevronRight className="chevron-icon" />
            </button>
            
            <div className="slide-text">
              <span>Chào mừng đến với lễ tốt nghiệp</span>
            </div>
          </div>
          
          <div className="slide-hint">
            <p>Chạm để xem lời mời</p>
          </div>
        </div>

        {/* Decorative stars */}
        <div className="decorative-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="star"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;