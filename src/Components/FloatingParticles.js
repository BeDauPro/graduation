import React from 'react';
import { Sparkles } from 'lucide-react';

const FloatingParticles = () => {
  return (
    <div className="floating-particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          <Sparkles className="particle-icon" />
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;