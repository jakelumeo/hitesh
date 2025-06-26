import React, { useEffect, useState } from 'react';

const AnswersSection = ({ active = true }) => {
  const [leftAnimated, setLeftAnimated] = useState(false);
  const [imageAnimated, setImageAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      // Small delay to ensure smooth animation start
      const timer = setTimeout(() => {
        setIsVisible(true);
        setLeftAnimated(true);
        setImageAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setLeftAnimated(false);
      setImageAnimated(false);
    }
  }, [active]);

  return (
    <section 
      className={`answers-section ${isVisible ? 'animate' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #FFF4E0, #FFE5B4, #FFD6A5)',
        backgroundSize: '400% 400%',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        position: 'relative',
        boxSizing: 'border-box',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        ...(isVisible && {
          animation: 'answers-bg-gradient 12s ease-in-out infinite',
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
          background: 'radial-gradient(circle at 30% 20%, rgba(68, 35, 26, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(68, 35, 26, 0.03) 0%, transparent 50%)',
          opacity: 0,
          transition: 'opacity 1.5s ease-out 0.5s',
          ...(isVisible && {
            opacity: 1,
            animation: 'backgroundPulse 4s ease-in-out infinite',
          })
        }}
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: 'rgba(68, 35, 26, 0.3)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            transform: 'translateY(20px) scale(0)',
            transition: `all ${1.5 + Math.random() * 0.8}s cubic-bezier(0.23, 1, 0.32, 1) ${Math.random() * 1}s`,
            ...(isVisible && {
              opacity: Math.random() * 0.6 + 0.2,
              transform: 'translateY(0) scale(1)',
              animation: `particleFloat ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
            })
          }}
        />
      ))}

      <div 
        className="answers-content-row"
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1400px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10rem',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className={`answers-left ${leftAnimated ? 'answers-left-animate' : ''}`}
          style={{
            flex: '1 1 45%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            color: '#44231a',
            zIndex: 2,
            opacity: 0,
            transform: 'translateX(-40px) scale(0.97)',
            transition: 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.2s',
            ...(leftAnimated && {
              opacity: 1,
              transform: 'translateX(0) scale(1)',
            })
          }}
        >
          <h2 
            className="answers-title"
            style={{
              fontSize: '3.2rem',
              fontWeight: 800,
              marginBottom: '18px',
              lineHeight: 1.08,
              color: '#fd9e00',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              transform: 'translateY(30px) scale(0.97)',
              transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.35s',
              ...(leftAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                animation: 'titleBreathe 3s ease-in-out infinite 1s',
              })
            }}
          >
            {leftAnimated ? (
              <>
                {'Lumeo has all the answers'.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`text-word ${wordIndex === 2 ? 'highlight-word' : ''}`}
                    style={{
                      display: 'inline-block',
                      marginRight: wordIndex < 4 ? '0.3em' : '0',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + wordIndex * 0.1}s`,
                      ...(leftAnimated && {
                        opacity: 1,
                        transform: 'translateY(0)',
                      }),
                      ...(wordIndex === 2 && {
                        background: 'linear-gradient(135deg, #fd9e00, #f97316)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        position: 'relative',
                      })
                    }}
                  >
                    {word}
                    {wordIndex === 2 && <br />}
                    {wordIndex === 2 && (
                      <span
                        style={{
                          content: '',
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          width: leftAnimated ? '100%' : '0%',
                          height: '3px',
                          background: 'linear-gradient(90deg, #fd9e00, #f97316)',
                          transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s',
                        }}
                      />
                    )}
                  </span>
                ))}
              </>
            ) : (
              'Lumeo has all the answers'
            )}
          </h2>
          
          <p 
            className="answers-desc"
            style={{
              fontSize: '1.1rem',
              color: '#44231a',
              marginBottom: '0.7em',
              maxWidth: '420px',
              opacity: 0,
              transform: 'translateY(30px) scale(0.97)',
              transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.55s',
              ...(leftAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              })
            }}
          >
            From taming your spending to paying off your debts and planning for your future, Lumeo can help you make smarter money choices. Starting now.
          </p>
          
          <p 
            className="answers-desc"
            style={{
              fontSize: '1.1rem',
              color: '#44231a',
              marginBottom: '0.7em',
              maxWidth: '420px',
              fontWeight: 600,
              opacity: 0,
              transform: 'translateY(30px) scale(0.97)',
              transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.7s',
              ...(leftAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              })
            }}
          >
            What do you want to know first?
          </p>
        </div>

        <div 
          className="answers-right"
          style={{
            flex: '1 1 55%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            position: 'relative',
            minWidth: '500px'
          }}
        >
          <div 
            className={`answers-image-wrapper ${imageAnimated ? 'answers-image-animate' : ''}`}
            style={{
              position: 'relative',
              width: '540px',
              height: '370px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              background: '#eee',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              backgroundImage: "url('/images/lumeohaveans.PNG')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0,
              transform: 'translateY(40px) scale(0.97)',
              transition: 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.4s',
              ...(imageAnimated && {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                animation: 'imageFloat 3s ease-in-out infinite 1s, imageGlow 4s ease-in-out infinite 1.5s',
              })
            }}
          >
            <div 
              className="answers-voice-bar"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '32px',
                transform: 'translateX(-50%)',
                background: 'rgba(105, 105, 90, 0.32)',
                color: '#fff',
                borderRadius: '24px',
                padding: '0 24px 0 24px',
                height: '56px',
                minWidth: '320px',
                maxWidth: '90%',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 500,
                zIndex: 3,
                gap: '18px',
                opacity: 0,
                transform: 'translateX(-50%) translateY(20px) scale(0.9)',
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1s',
                ...(imageAnimated && {
                  opacity: 1,
                  transform: 'translateX(-50%) translateY(0) scale(1)',
                  animation: 'voiceBarPulse 2s ease-in-out infinite 2s',
                })
              }}
            >
              <div className="answers-voice-icon" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <div style={{ width: '12px', height: '12px', background: '#4ade80', borderRadius: '50%', marginRight: '8px', animation: imageAnimated ? 'pulse 1.5s ease-in-out infinite' : 'none' }}></div>
              </div>
              <span className="answers-voice-text" style={{ fontSize: '1.1rem', fontWeight: 500, marginRight: '10px', color: '#fff', opacity: 0.95 }}>
                Lumeo is ready to answer
              </span>
              <div className="answers-voice-arrow" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="answers-arrow-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes answers-bg-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
            transform: translateY(-10px) translateX(8px) rotate(90deg);
          }
          50% { 
            transform: translateY(-15px) translateX(-4px) rotate(180deg);
          }
          75% { 
            transform: translateY(-8px) translateX(-10px) rotate(270deg);
          }
        }

        @keyframes imageFloat {
          0%, 100% { 
            transform: translateY(0) scale(1);
          }
          25% { 
            transform: translateY(-6px) scale(1.01);
          }
          50% { 
            transform: translateY(-10px) scale(1.02);
          }
          75% { 
            transform: translateY(-4px) scale(1.01);
          }
        }

        @keyframes imageGlow {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          }
          50% {
            box-shadow: 
              0 12px 40px rgba(0,0,0,0.15), 
              0 0 20px rgba(68, 35, 26, 0.1);
          }
        }

        @keyframes wordReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(90deg) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) rotateX(0deg) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes titleBreathe {
          0%, 100% {
            text-shadow: none;
          }
          50% {
            text-shadow: 0 2px 8px rgba(68, 35, 26, 0.2);
          }
        }

        @keyframes voiceBarPulse {
          0%, 100% {
            background: rgba(105, 105, 90, 0.32);
          }
          50% {
            background: rgba(105, 105, 90, 0.4);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @media (max-width: 1000px) {
          .answers-content-row {
            flex-direction: column !important;
            padding: 30px 10px !important;
            align-items: flex-start !important;
          }
          .answers-right {
            min-width: 0 !important;
            width: 100% !important;
            margin-top: 30px !important;
            justify-content: center !important;
          }
          .answers-image-wrapper {
            width: 90% !important;
            max-width: 500px !important;
            height: 300px !important;
          }
          .answers-title {
            font-size: 2.5rem !important;
          }
        }

        @media (max-width: 600px) {
          .answers-content-row {
            padding: 20px 5px !important;
          }
          .answers-image-wrapper {
            width: 95% !important;
            height: 250px !important;
          }
          .answers-title {
            font-size: 2rem !important;
          }
          .answers-desc {
            font-size: 1rem !important;
          }
          .answers-voice-bar {
            min-width: 280px !important;
            padding: 0 16px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AnswersSection;