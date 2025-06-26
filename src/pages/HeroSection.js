import React, { useEffect, useState, useRef, useMemo } from 'react';
import AnimatedSocialFeed from './AnimatedSocialFeed';

const HeroSection = ({ animatedText = [], active = true }) => {
  const [showContent, setShowContent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [textGlow, setTextGlow] = useState(false);
  const sectionRef = useRef();
  const heroContentRef = useRef();

  // Create static particle data to prevent recalculation on mouse movement
  const particleData = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
      translateY: -Math.random() * 30 - 10,
      transitionDelay: Math.random() * 0.5,
      transitionDuration: 1 + Math.random() * 0.5,
      animationDuration: 3 + Math.random() * 2,
      animationDelay: Math.random() * 2,
    }));
  }, []);

  // Default animated text if none provided
  const defaultAnimatedText = [
    <span className="intro-text">Welcome to your financial future</span>,
    <h1>Take control of your <span className="highlight-text">money</span></h1>,
    <h1>with <span className="highlight-text">intelligent</span> insights</h1>,
    <h1>and <span className="highlight-text">smart</span> automation</h1>
  ];

  const textContent = animatedText.length > 0 ? animatedText : defaultAnimatedText;

  // Mouse tracking for interactive effects
  useEffect(() => {
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      if (!active || !sectionRef.current) return;
      
      // Use requestAnimationFrame for smoother performance
      animationFrameId = requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        
        // Add glow effect when mouse is near text (simplified)
        if (heroContentRef.current) {
          const textRect = heroContentRef.current.getBoundingClientRect();
          const textDistance = Math.sqrt(
            Math.pow(e.clientX - (textRect.left + textRect.width / 2), 2) +
            Math.pow(e.clientY - (textRect.top + textRect.height / 2), 2)
          );
          setTextGlow(textDistance < 200);
        }
      });
    };

    if (active) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [active]);

  // Particle system
  useEffect(() => {
    if (!active) return;

    // Clear existing particles when section becomes inactive
    if (!active) {
      setParticles([]);
    }
  }, [active]);

  // Ensure content is visible when section becomes active
  useEffect(() => {
    if (active) {
      // Force a small delay to ensure DOM is ready
      const visibilityTimer = setTimeout(() => {
        if (heroContentRef.current) {
          heroContentRef.current.style.visibility = 'visible';
          heroContentRef.current.style.opacity = '1';
        }
      }, 100);
      
      return () => clearTimeout(visibilityTimer);
    }
  }, [active]);

  // Start animations when section becomes active
  useEffect(() => {
    if (active) {
      // Reset states first, then start animations
      setShowContent(false);
      setShowPhone(false);
      setCurrentLine(0);
      
      // Small delay to ensure reset is applied, then start animations
      const resetTimer = setTimeout(() => {
        setShowContent(true);
        
        const lineTimer = setTimeout(() => setCurrentLine(1), 200);
        const lineTimer2 = setTimeout(() => setCurrentLine(2), 400);
        const lineTimer3 = setTimeout(() => setCurrentLine(3), 600);
        const lineTimer4 = setTimeout(() => setCurrentLine(4), 800);
        const phoneTimer = setTimeout(() => setShowPhone(true), 1000);

        return () => {
          [lineTimer, lineTimer2, lineTimer3, lineTimer4, phoneTimer].forEach(clearTimeout);
        };
      }, 30);

      return () => {
        clearTimeout(resetTimer);
      };
    } else {
      setShowContent(false);
      setShowPhone(false);
      setCurrentLine(0);
    }
  }, [active]);

  const backgroundStyle = {
    background: active ? `
      radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
        rgba(253, 158, 0, 0.15) 0%, 
        rgba(249, 115, 22, 0.08) 30%,
        rgba(255, 244, 224, 0.95) 70%, 
        transparent 100%)
    ` : 'transparent',
    transition: 'background 0.4s ease',
  };

  return (
    <div 
      ref={sectionRef}
      className="hero-section homepage-section"
      style={backgroundStyle}
    >
      {/* Floating Particles */}
      {particleData.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${active ? 'animate' : ''}`}
          style={{
            position: 'absolute',
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: '#f97316',
            borderRadius: '50%',
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: 0,
            transform: `translateY(50px) scale(0)`,
            transition: `all ${particle.transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1) ${particle.transitionDelay}s`,
            ...(active && {
              opacity: particle.opacity,
              transform: `translateY(${particle.translateY}px) scale(1)`,
              animation: `float ${particle.animationDuration}s ease-in-out infinite ${particle.animationDelay}s`,
            })
          }}
        />
      ))}

      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <div 
          className="bg-circle bg-circle-1"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) scale(${1 + mousePosition.x * 0.1})`
          }}
        />
        <div 
          className="bg-circle bg-circle-2"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -25}px) rotate(${mousePosition.x * 45}deg)`
          }}
        />
        <div 
          className="bg-wave"
          style={{
            transform: `translateX(${mousePosition.x * 40}px) scaleY(${1 + mousePosition.y * 0.2})`
          }}
        />
      </div>

      <div 
        ref={heroContentRef}
        className={`hero-content ${showContent ? 'hero-content-animate' : ''} ${textGlow ? 'text-glow' : ''}`}
      >
        {textContent.map((line, index) => (
          <div
            key={index}
            className={`hero-line hero-line-${index + 1} ${currentLine >= index + 1 ? 'hero-line-visible' : ''}`}
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 3}px)`,
              transition: 'transform 0.3s ease'
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div className={`hero-phone-container ${showPhone ? 'hero-phone-animate-in' : ''}`}>
        <div className="phone-effects">
          <div className="phone-glow"></div>
          <div className="phone-reflection"></div>
        </div>
        <AnimatedSocialFeed className="small-social-feed" />
      </div>

      <style jsx>{`
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          position: relative;
          overflow: hidden;
          padding: 0 10%;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .hero-particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          animation: heroParticleFloat 4s ease-in-out infinite;
        }

        .hero-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .bg-circle-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(253, 158, 0, 0.1) 0%, rgba(253, 158, 0, 0.02) 70%);
          top: 20%;
          right: 15%;
          animation: bgFloat 12s ease-in-out infinite;
        }

        .bg-circle-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0.01) 70%);
          bottom: 25%;
          left: 10%;
          animation: bgFloat 8s ease-in-out infinite reverse;
        }

        .bg-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(90deg, 
            rgba(253, 158, 0, 0.05) 0%, 
            rgba(249, 115, 22, 0.03) 50%, 
            rgba(253, 158, 0, 0.05) 100%);
          clip-path: polygon(0 50%, 100% 80%, 100% 100%, 0% 100%);
          animation: waveFloat 6s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .hero-content {
          flex-basis: 48%;
          z-index: 3;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          padding-left: 2vw;
          opacity: ${showContent ? 1 : 0};
          transform: translateX(${showContent ? 0 : -50}px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .text-glow {
          filter: drop-shadow(0 0 20px rgba(253, 158, 0, 0.3));
          transition: filter 0.3s ease;
        }

        .hero-content::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(253, 158, 0, 0.1) 0%, transparent 70%);
          opacity: ${textGlow ? 1 : 0};
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }

        .hero-line {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 8px;
        }

        .hero-line-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line-1 { transition-delay: 0.1s; }
        .hero-line-2 { transition-delay: 0.2s; }
        .hero-line-3 { transition-delay: 0.3s; }
        .hero-line-4 { transition-delay: 0.4s; margin-bottom: 0; }

        .intro-text {
          font-size: 1.5rem;
          font-weight: 400;
          color: #6d3b2c;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
          position: relative;
        }

        .intro-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: ${currentLine >= 1 ? '100%' : '0%'};
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          line-height: 1.08;
          font-weight: 800;
          color: #4a2a1c;
          margin: 0;
          letter-spacing: -0.01em;
          position: relative;
          overflow: hidden;
        }

        .highlight-text {
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
          animation: highlightPulse 3s ease-in-out infinite;
        }

        .hero-content h1::before {
          content: '';
          position: absolute;
          top: 0;
          left: ${currentLine >= 2 ? '100%' : '-100%'};
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s;
        }

        .hero-phone-container {
          flex-basis: 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          height: 100%;
          position: relative;
          opacity: ${showPhone ? 1 : 0};
          transform: translateY(${showPhone ? 0 : 100}px) scale(${showPhone ? 1 : 0.9});
          transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .phone-effects {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .phone-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(253, 158, 0, 0.2) 0%, transparent 70%);
          opacity: ${showPhone ? 1 : 0};
          animation: phoneGlow 4s ease-in-out infinite;
        }

        .phone-reflection {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 30%;
          height: 40%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent);
          opacity: ${showPhone ? 0.6 : 0};
          animation: phoneReflection 2s ease-in-out infinite alternate;
        }

        .social-feed-mockup {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          width: 280px;
          animation: ${showPhone ? 'phoneBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both, phoneFloat 3s ease-in-out infinite 1s' : 'none'};
        }

        .feed-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .profile-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fd9e00, #f97316);
          margin-right: 12px;
        }

        .username {
          font-weight: 600;
          color: #1f2937;
          font-size: 14px;
        }

        .timestamp {
          color: #6b7280;
          font-size: 12px;
        }

        .feed-text {
          color: #374151;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .feed-stats {
          display: flex;
          gap: 20px;
          color: #6b7280;
          font-size: 14px;
        }

        @keyframes heroParticleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        @keyframes bgFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @keyframes waveFloat {
          0%, 100% { transform: translateY(0) scaleX(1); }
          50% { transform: translateY(-10px) scaleX(1.02); }
        }

        @keyframes highlightPulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }

        @keyframes phoneGlow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes phoneReflection {
          0% { opacity: 0.3; transform: translate(0, 0); }
          100% { opacity: 0.6; transform: translate(10px, -5px); }
        }

        @keyframes phoneBounce {
          0% { transform: scale(0.8) translateY(20px); }
          50% { transform: scale(1.05) translateY(-10px); }
          100% { transform: scale(1) translateY(0); }
        }

        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column;
            height: auto;
            min-height: 100vh;
            padding: 40px 5%;
          }

          .hero-content {
            padding-left: 0;
            align-items: center;
            text-align: center;
            flex-basis: auto;
            margin-bottom: 32px;
          }

          .hero-phone-container {
            flex-basis: auto;
            width: 100%;
            justify-content: center;
            min-height: 320px;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .intro-text {
            font-size: 1.2rem;
          }

          .bg-circle-1, .bg-circle-2 {
            display: none;
          }

          .social-feed-mockup {
            width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;