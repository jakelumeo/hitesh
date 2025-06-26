import React, { useEffect, useRef, useState } from 'react';

const TryCleoSection = ({ active = true }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [active]);

  return (
    <section 
      ref={sectionRef}
      className="try-cleo-section homepage-section"
      style={{
        background: 'linear-gradient(135deg, #FFF4E0 0%, #fdfaf6 50%, #FFF4E0 100%)',
        minHeight: '70vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '60px 0',
      }}
    >
      {/* Animated Background Accent */}
      <div 
        className={`try-cleo-bg-accent ${active && isVisible ? 'animate' : ''}`}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, #f97316 0%, #FFF4E0 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '50%',
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.5) rotate(-180deg)',
          transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          ...(active && isVisible && {
            opacity: 0.32,
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
          })
        }}
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`particle ${active && isVisible ? 'animate' : ''}`}
          style={{
            position: 'absolute',
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            background: '#f97316',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            transform: `translateY(50px) scale(0)`,
            transition: `all ${1 + Math.random() * 0.5}s cubic-bezier(0.23, 1, 0.32, 1) ${Math.random() * 0.5}s`,
            ...(active && isVisible && {
              opacity: Math.random() * 0.6 + 0.2,
              transform: `translateY(${-Math.random() * 30 - 10}px) scale(1)`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`,
            })
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        className={`try-cleo-content ${active && isVisible ? 'animate' : ''}`}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto',
          opacity: 0,
          transform: 'translateY(60px) scale(0.95)',
          transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s',
          ...(active && isVisible && {
            opacity: 1,
            transform: 'translateY(0) scale(1)',
          })
        }}
      >
        <h2 
          className={`title ${active && isVisible ? 'animate' : ''}`}
          style={{
            fontSize: '5vw',
            fontWeight: 900,
            color: '#F97316',
            margin: '0 0 32px 0',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            opacity: 0,
            transform: 'translateY(40px) rotateX(90deg)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.5s',
            transformOrigin: 'center bottom',
            textShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
            ...(active && isVisible && {
              opacity: 1,
              transform: 'translateY(0) rotateX(0deg)',
              animation: 'titleGlow 3s ease-in-out infinite 1s, titleFloat 4s ease-in-out infinite 1.5s',
            })
          }}
        >
          {active && isVisible ? (
            <>
              {'Try Lumeo today'.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{
                    display: 'inline-block',
                    marginRight: wordIndex < 2 ? '0.3em' : '0',
                    opacity: 0,
                    transform: 'translateY(30px) rotateX(90deg)',
                    animation: `wordReveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${0.8 + wordIndex * 0.15}s`,
                  }}
                >
                  {word}
                  {wordIndex === 2 && <br />}
                </span>
              ))}
            </>
          ) : (
            <>
              Try Lumeo today<br />
              <span className="nowrap"></span>
            </>
          )}
        </h2>
        
        <p 
          className={`subtitle ${active && isVisible ? 'animate' : ''}`}
          style={{
            fontSize: '2rem',
            color: '#F97316',
            fontWeight: 700,
            margin: '0 0 40px 0',
            opacity: 0,
            transform: 'translateY(30px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.7s',
            ...(active && isVisible && {
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              animation: 'subtitlePulse 2.5s ease-in-out infinite 1.2s',
            })
          }}
        >
          {active && isVisible && "Join millions who trust Lumeo with their financial future"}
        </p>
        
        <button 
          className={`try-cleo-btn ${active && isVisible ? 'animate' : ''}`}
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #fd9e00, #fcba36, #fdc557)',
            backgroundSize: '200% 200%',
            color: '#44221c',
            fontSize: '1.3rem',
            fontWeight: 700,
            border: 'none',
            borderRadius: '32px',
            padding: '18px 48px',
            cursor: 'pointer',
            boxShadow: `
              0 8px 25px rgba(253, 158, 0, 0.18),
              0 4px 15px rgba(252, 186, 54, 0.13),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            opacity: 0,
            transform: 'translateY(40px) scale(0.8)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.9s',
            ...(active && isVisible && {
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              animation: 'gradientShift 3s ease-in-out infinite, buttonPulse 2s ease-in-out infinite 1.5s',
            })
          }}
          onMouseEnter={(e) => {
            if (active && isVisible) {
              e.target.style.background = 'transparent';
              e.target.style.color = '#44221c';
              e.target.style.boxShadow = '0 0 20px 5px #fd9e00, 0 0 40px 10px #fcba36, 0 0 60px 15px #fdc557';
              e.target.style.border = '2px solid #fd9e00';
              e.target.style.transform = 'translateY(-4px) scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (active && isVisible) {
              e.target.style.background = 'linear-gradient(135deg, #fd9e00, #fcba36, #fdc557)';
              e.target.style.color = '#44221c';
              e.target.style.boxShadow = `
                0 8px 25px rgba(253, 158, 0, 0.18),
                0 4px 15px rgba(252, 186, 54, 0.13),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `;
              e.target.style.border = 'none';
              e.target.style.transform = 'translateY(0) scale(1)';
            }
          }}
        >
          {active && isVisible ? (
            <>
              {'Get Started Now'.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{
                    display: 'inline-block',
                    marginRight: wordIndex < 2 ? '0.3em' : '0',
                    opacity: 0,
                    transform: 'translateY(20px) rotateX(90deg)',
                    animation: `wordReveal 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards ${1.2 + wordIndex * 0.1}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </>
          ) : (
            'Get Started Now'
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% { 
            transform: translateY(-35px) translateX(-5px) rotate(180deg);
          }
          75% { 
            transform: translateY(-15px) translateX(-15px) rotate(270deg);
          }
        }

        @keyframes titleGlow {
          0%, 100% {
            text-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
          }
          50% {
            text-shadow: 
              0 6px 30px rgba(249, 115, 22, 0.5),
              0 0 25px rgba(249, 115, 22, 0.3);
          }
        }

        @keyframes titleFloat {
          0%, 100% { 
            transform: translateY(0) rotateX(0deg);
          }
          50% { 
            transform: translateY(-8px) rotateX(2deg);
          }
        }

        @keyframes subtitlePulse {
          0%, 100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-3px) scale(1.02);
          }
        }

        @keyframes wordReveal {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(90deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px) rotateX(0deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes buttonPulse {
          0%, 100% { 
            transform: translateY(0) scale(1);
            box-shadow: 
              0 8px 25px rgba(253, 158, 0, 0.18),
              0 4px 15px rgba(252, 186, 54, 0.13),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          50% { 
            transform: translateY(-2px) scale(1.02);
            box-shadow: 
              0 12px 35px rgba(253, 158, 0, 0.25),
              0 6px 20px rgba(252, 186, 54, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        }

        @media (max-width: 900px) {
          .try-cleo-section {
            padding: 32px 0 32px 0;
          }
          .try-cleo-bg-accent {
            width: 320px;
            height: 220px;
          }
          .try-cleo-content h2 {
            font-size: 2.2rem;
          }
          .try-cleo-content p {
            font-size: 1.1rem;
          }
          .try-cleo-btn {
            font-size: 1rem;
            padding: 12px 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default TryCleoSection;