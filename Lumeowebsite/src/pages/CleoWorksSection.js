import React, { useEffect, useRef, useState } from 'react';

const CleoWorksSection = ({ active = true }) => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [active]);

  const images = [
    { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308", alt: "Person 1", position: "top-left" },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", alt: "Person 2", position: "top-right" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "Person 3", position: "bottom-left" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", alt: "Person 4", position: "bottom-right" }
  ];

  const getImagePosition = (position) => {
    const positions = {
      'top-left': { top: '10%', left: '8%' },
      'top-right': { top: '5%', right: '12%' },
      'bottom-left': { bottom: '8%', left: '18%' },
      'bottom-right': { bottom: '12%', right: '6%' }
    };
    return positions[position] || {};
  };

  return (
    <section 
      ref={sectionRef}
      className={`cleo-works-section homepage-section ${active && isVisible ? 'animate' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #F97316 0%, #ea580c 50%, #F97316 100%)',
        backgroundSize: '200% 200%',
        color: '#fff',
        minHeight: '80vh',
        maxHeight: '25rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 0 80px 0',
        overflow: 'hidden',
        boxSizing: 'border-box',
        maxWidth: '1300px',
        borderRadius: '18px',
        margin: '0 auto',
        opacity: 0,
        transform: 'translateY(60px) scale(0.95)',
        transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        ...(active && isVisible && {
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          animation: 'gradientFlow 6s ease-in-out infinite',
        })
      }}
    >
      {/* Animated Background Elements */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
          opacity: 0,
          transition: 'opacity 1.5s ease-out 0.5s',
          ...(active && isVisible && {
            opacity: 1,
            animation: 'backgroundPulse 4s ease-in-out infinite',
          })
        }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            transform: 'translateY(20px) scale(0)',
            transition: `all ${1.5 + Math.random() * 0.8}s cubic-bezier(0.23, 1, 0.32, 1) ${Math.random() * 1}s`,
            ...(active && isVisible && {
              opacity: Math.random() * 0.8 + 0.2,
              transform: 'translateY(0) scale(1)',
              animation: `particleFloat ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
            })
          }}
        />
      ))}

      {/* Images with Enhanced Animations */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          style={{
            position: 'absolute',
            maxWidth: '220px',
            maxHeight: '140px',
            objectFit: 'cover',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 1.5px 8px rgba(0,0,0,0.15)',
            background: '#fff',
            border: '2px solid rgba(255,255,255,0.9)',
            boxSizing: 'border-box',
            zIndex: 2,
            opacity: 0,
            transform: `translateY(80px) scale(0.7) rotate(${Math.random() * 20 - 10}deg)`,
            transition: `all 1s cubic-bezier(0.23, 1, 0.32, 1) ${0.3 + index * 0.2}s`,
            ...getImagePosition(img.position),
            ...(active && isVisible && {
              opacity: 1,
              transform: 'translateY(0) scale(1) rotate(0deg)',
              animation: `imageFloat ${3 + index * 0.5}s ease-in-out infinite ${index * 0.8}s, imageGlow ${4 + index * 0.3}s ease-in-out infinite ${1 + index * 0.5}s`,
            })
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        className="cleo-works-content"
        style={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 3,
          maxWidth: '900px',
          margin: '0 auto 32px auto',
          wordBreak: 'break-word',
          width: '100%',
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.8s',
          ...(active && isVisible && {
            opacity: 1,
            transform: 'translateY(0)',
          })
        }}
      >
        <h2 
          style={{
            fontSize: '5vw',
            fontWeight: 900,
            margin: '0 0 22px 0',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            textShadow: '0 4px 32px rgba(0,0,0,0.25), 0 1.5px 8px rgba(0,0,0,0.15)',
            color: '#fff',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1s',
            ...(active && isVisible && {
              opacity: 1,
              transform: 'translateY(0)',
              animation: 'titleBreathe 3s ease-in-out infinite 1.5s',
            })
          }}
        >
          {active && isVisible ? (
            <>
              {'Lumeo works for you'.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{
                    display: 'inline-block',
                    marginRight: wordIndex < 3 ? '0.3em' : '0',
                    opacity: 0,
                    transform: 'translateY(20px) rotateX(90deg)',
                    animation: `wordReveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${1.2 + wordIndex * 0.15}s`,
                  }}
                >
                  {word}
                  {wordIndex === 2 && <br />}
                </span>
              ))}
            </>
          ) : (
            <>
              Lumeo works for you<br />
              <span className="nowrap"></span>
            </>
          )}
        </h2>
        
        <p 
          className="cleo-works-sub"
          style={{
            fontSize: '1.3rem',
            fontWeight: 400,
            margin: '0 auto',
            maxWidth: '520px',
            opacity: 0,
            textShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: 'rgba(255,255,255,0.95)',
            transform: 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.8s',
            ...(active && isVisible && {
              opacity: 0.95,
              transform: 'translateY(0)',
              animation: 'subtitleGlow 2.5s ease-in-out infinite 2.2s',
            })
          }}
        >
          {active && isVisible && "Experience personalized financial guidance that adapts to your unique goals and lifestyle."}
        </p>
      </div>

      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes backgroundPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% { 
            transform: translateY(-15px) translateX(10px) rotate(90deg);
          }
          50% { 
            transform: translateY(-25px) translateX(-5px) rotate(180deg);
          }
          75% { 
            transform: translateY(-10px) translateX(-15px) rotate(270deg);
          }
        }

        @keyframes imageFloat {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(0deg);
          }
          25% { 
            transform: translateY(-8px) scale(1.02) rotate(1deg);
          }
          50% { 
            transform: translateY(-12px) scale(1.05) rotate(0deg);
          }
          75% { 
            transform: translateY(-6px) scale(1.02) rotate(-1deg);
          }
        }

        @keyframes imageGlow {
          0%, 100% {
            box-shadow: 
              0 8px 32px rgba(0,0,0,0.3), 
              0 1.5px 8px rgba(0,0,0,0.15);
          }
          50% {
            box-shadow: 
              0 12px 40px rgba(0,0,0,0.4), 
              0 2px 12px rgba(0,0,0,0.2),
              0 0 20px rgba(255,255,255,0.3);
          }
        }

        @keyframes wordReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(90deg) scale(0.8);
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

        @keyframes titleBreathe {
          0%, 100% {
            text-shadow: 
              0 4px 32px rgba(0,0,0,0.25), 
              0 1.5px 8px rgba(0,0,0,0.15);
          }
          50% {
            text-shadow: 
              0 6px 40px rgba(0,0,0,0.35), 
              0 2px 12px rgba(0,0,0,0.2),
              0 0 25px rgba(255,255,255,0.3);
          }
        }

        @keyframes subtitleGlow {
          0%, 100% {
            text-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
          50% {
            text-shadow: 
              0 3px 12px rgba(0,0,0,0.2),
              0 0 15px rgba(255,255,255,0.2);
          }
        }

        @media (max-width: 1200px) {
          .cleo-works-section img {
            width: min(180px, 30vw) !important;
            height: min(110px, 18vw) !important;
            border-radius: 14px !important;
            margin: 0 4px !important;
            max-width: 100% !important;
          }
          .cleo-works-content h2 {
            font-size: 3.2rem !important;
          }
          .cleo-works-section {
            max-width: 98vw !important;
          }
        }

        @media (max-width: 900px) {
          .cleo-works-section {
            padding: 48px 0 30px 0 !important;
            max-width: 100vw !important;
          }
          .cleo-works-content h2 {
            font-size: 2.2rem !important;
          }
          .cleo-works-section img {
            max-width: 120px !important;
            max-height: 80px !important;
            border-radius: 10px !important;
          }
        }

        @media (max-width: 600px) {
          .cleo-works-section {
            padding: 24px 0 16px 0 !important;
          }
          .cleo-works-content {
            max-width: 98vw !important;
            padding: 0 2vw !important;
          }
          .cleo-works-section img {
            max-width: 70px !important;
            max-height: 40px !important;
            border-radius: 6px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CleoWorksSection;