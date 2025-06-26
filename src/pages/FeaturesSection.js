import React, { useEffect, useState, useRef } from 'react';
import AnimatedSavingsGauge from './AnimatedSavingsGauge';
import AnimatedStatsGraph from './AnimatedStatsGraph';
// Mock components for demonstration
const FeaturesSection = ({ active = true, className = '' }) => {
  const [showContent, setShowContent] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showGauge, setShowGauge] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const particleRef = useRef();
  const sectionRef = useRef();

  // Particle system
  useEffect(() => {
    if (!active) return;

    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 30, // Orange-yellow range
    });

    const initialParticles = Array.from({ length: 20 }, createParticle);
    setParticles(initialParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        opacity: particle.opacity - 0.002,
      })).filter(p => p.opacity > 0));
    };

    const interval = setInterval(animateParticles, 50);
    const addParticle = setInterval(() => {
      setParticles(prev => [...prev, createParticle()]);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(addParticle);
    };
  }, [active]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    if (active) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [active]);

  // Start animations when section becomes active
  useEffect(() => {
    if (active) {
      setShowContent(true);
      setTimeout(() => setShowCards(true), 300);
      setTimeout(() => setShowGauge(true), 600);
    } else {
      setShowContent(false);
      setShowCards(false);
      setShowGauge(false);
    }
  }, [active]);

  const backgroundStyle = {
    background: 'transparent',
  };

  return (
    <div 
      ref={sectionRef}
      className={`features-section ${className} ${active ? 'active' : ''}`}
      style={backgroundStyle}
    >
      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              background: `hsl(${particle.hue}, 70%, 60%)`,
            }}
          />
        ))}
      </div>

      {/* Animated Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1" style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(${mousePosition.x * 45}deg)`
        }} />
        <div className="shape shape-2" style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) rotate(${mousePosition.y * 60}deg)`
        }} />
        <div className="shape shape-3" style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px) rotate(${mousePosition.x * -30}deg)`
        }} />
      </div>

      <div className={`features-layout ${showContent ? 'features-layout-animate' : ''}`}>
        <div className={`features-text ${showContent ? 'features-text-animate' : ''}`}>
          <h2>
            <span className="text-word">The</span>
            <span className="text-word">financial</span>
            <span className="text-word highlight-word">genius</span>
            <span className="text-word">that</span>
            <span className="text-word">fits</span>
            <span className="text-word">in</span>
            <span className="text-word">your</span>
            <span className="text-word">pocket</span>
          </h2>
        </div>
        
        <div className={`features-grid ${showCards ? 'features-grid-animate' : ''}`}>
          <div className={`card image-card-1 ${showCards ? 'card-animate' : ''}`}>
            <div className="card-overlay">
              <div className="card-content">
                <h3>Smart Tracking</h3>
                <p>AI-powered expense categorization</p>
              </div>
            </div>
          </div>
          
          <div className="card-wrapper">
            <AnimatedSavingsGauge active={showGauge} />
          </div>
          
          <div className="card-wrapper">
            <AnimatedStatsGraph active={active} />
          </div>
          
          <div className={`card image-card-2 ${showCards ? 'card-animate' : ''}`}>
            <div className="card-overlay">
              <div className="card-content">
                <h3>Instant Insights</h3>
                <p>Real-time financial analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 80px 5%;
          text-align: left;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          opacity: ${active ? 1 : 0.8};
          transform: translateY(${active ? 0 : 20}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          animation: particleFloat 3s ease-in-out infinite;
        }

        .bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(253, 158, 0, 0.1), rgba(249, 115, 22, 0.05));
          top: 10%;
          right: 10%;
          animation: shapeFloat 8s ease-in-out infinite;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(102, 153, 255, 0.05));
          bottom: 20%;
          left: 5%;
          animation: shapeFloat 6s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.05));
          top: 50%;
          left: 20%;
          animation: shapeFloat 10s ease-in-out infinite;
        }

        .features-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 100px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 3;
          opacity: ${showContent ? 1 : 0.8};
          transform: translateX(${showContent ? 0 : -10}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .features-text {
          flex: 1 1 40%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          opacity: ${showContent ? 1 : 0.8};
          transform: translateY(${showContent ? 0 : 10}px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .features-text h2 {
          font-size: 2rem;
          color: #fd9e00;
          line-height: 1.2;
          font-weight: 800;
          margin: 0;
          position: relative;
          overflow: hidden;
        }

        .text-word {
          display: inline-block;
          margin-right: 0.5rem;
          opacity: ${showContent ? 1 : 0};
          transform: translateY(${showContent ? 0 : 20}px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-word:nth-child(1) { transition-delay: 0.1s; }
        .text-word:nth-child(2) { transition-delay: 0.2s; }
        .text-word:nth-child(3) { transition-delay: 0.3s; }
        .text-word:nth-child(4) { transition-delay: 0.4s; }
        .text-word:nth-child(5) { transition-delay: 0.5s; }
        .text-word:nth-child(6) { transition-delay: 0.6s; }
        .text-word:nth-child(7) { transition-delay: 0.7s; }
        .text-word:nth-child(8) { transition-delay: 0.8s; }

        .highlight-word {
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .highlight-word::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: ${showContent ? '100%' : '0%'};
          height: 3px;
          background: linear-gradient(90deg, #fd9e00, #f97316);
          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
        }

        .features-grid {
          flex: 1 1 60%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 30px;
          height: 600px;
          opacity: ${showCards ? 1 : 0.8};
          transform: translateX(${showCards ? 0 : 10}px) scale(${showCards ? 1 : 0.98});
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card, .card-wrapper {
          border-radius: 30px;
          overflow: hidden;
          opacity: ${showCards ? 1 : 0.8};
          transform: scale(${showCards ? 1 : 0.95}) translateY(${showCards ? 0 : 10}px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .card-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1));
          display: flex;
          align-items: flex-end;
          padding: 30px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card:hover .card-overlay {
          opacity: 1;
        }

        .card-content h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .card-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          margin: 0;
        }

        .card:hover, .card-wrapper:hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .image-card-1 {
          background: url('/images/homepagetopleft.PNG');
          background-size: cover;
          background-position: center;
          transition-delay: 0.1s;
        }

        .image-card-2 {
          background: url('/images/homepagetopright.PNG');
          background-size: cover;
          background-position: center;
          transition-delay: 0.2s;
        }

        .card-animate {
          animation: cardFloat 4s ease-in-out infinite;
        }

        .image-card-1.card-animate {
          animation-delay: 0s;
        }

        .image-card-2.card-animate {
          animation-delay: 2s;
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes shapeFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 900px) {
          .features-layout {
            flex-direction: column;
            gap: 50px;
          }
          
          .features-text {
            text-align: center;
            justify-content: center;
          }
          
          .features-text h2 {
            font-size: 1.5rem;
          }
          
          .features-grid {
            height: 400px;
            gap: 20px;
          }

          .bg-shapes {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;