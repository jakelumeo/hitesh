import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Homepage.css';
import './HeroSection.css';
import './FeaturesSection.css';
import './MoneyTalksSection.css';
import './UnderstandSection.css';
import './VerticalImageCarousel.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import MoneyTalksSection from './MoneyTalksSection';
import UnderstandSection from './UnderstandSection';
import VerticalImageCarousel from './VerticalImageCarousel';
import ChallengeSection from './ChallengeSection';
import AnswersSection from './AnswersSection';
import CleoWorksSection from './CleoWorksSection';
import TryCleoSection from './TryCleoSection';

const Homepage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [prevSection, setPrevSection] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  // Simple text for hero (you can animate this in HeroSection component)
  const textLines = [
    { text: "Introducing Lumeo", type: 'p', className: 'intro-text' },
    { text: "The world's first", type: 'h1' },
    { text: "AI social finance", type: 'h1' },
    { text: "sidekick", type: 'h1' },
  ];
  
  const simpleText = textLines.map((line, lineIndex) => {
    if (line.type === 'p') {
      return <p key={lineIndex} className={line.className}>{line.text}</p>;
    }
    return <h1 key={lineIndex}>{line.text}</h1>;
  });

  // Section components in order
  const sections = [
    <HeroSection animatedText={simpleText} active={activeSection === 0} key={`hero-${activeSection === 0 ? 'active' : 'inactive'}`} />,
    <FeaturesSection active={activeSection === 1} key={`features-${activeSection === 1 ? 'active' : 'inactive'}`} />,
    <MoneyTalksSection active={activeSection === 2} key={`moneytalks-${activeSection === 2 ? 'active' : 'inactive'}`} />,
    <UnderstandSection active={activeSection === 3} key={`understand-${activeSection === 3 ? 'active' : 'inactive'}`} />,
    <ChallengeSection active={activeSection === 4} key={`challenge-${activeSection === 4 ? 'active' : 'inactive'}`} />,
    <AnswersSection active={activeSection === 5} key={`answers-${activeSection === 5 ? 'active' : 'inactive'}`} />,
    <CleoWorksSection active={activeSection === 6} key={`cleoworks-${activeSection === 6 ? 'active' : 'inactive'}`} />,
    <TryCleoSection active={activeSection === 7} key={`trycleo-${activeSection === 7 ? 'active' : 'inactive'}`} />,
  ];

  // Track transition state for custom animations
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('');

  // Get transition type between sections
  const getTransitionType = (from, to) => {
    // Hero (0) to Features (1) - smooth slide transition
    if (from === 0 && to === 1) return 'slide-horizontal';
    // Features (1) to Hero (0) - reverse slide transition
    if (from === 1 && to === 0) return 'slide-horizontal';
    // MoneyTalks (2) to Understand (3) - expanding background
    if (from === 2 && to === 3) return 'expand-background';
    // Understand (3) to MoneyTalks (2) - shrinking background  
    if (from === 3 && to === 2) return 'shrink-background';
    // Challenge (4) to Answers (5) - custom transition
    if (from === 4 && to === 5) return 'challenge-to-answers';
    // Add more transition types here
    return 'default';
  };

  // Switch to section with custom transition - memoized to prevent recreation
  const goToSection = useCallback((sectionIndex) => {
    if (sectionIndex === activeSection || isTransitioning) return;
   
    const transition = getTransitionType(activeSection, sectionIndex);

    setPrevSection(activeSection);
    setTransitionType(transition);
    setIsTransitioning(true);

    // Prevent scrolling during transition
    isScrolling.current = true;
 
    // Add transitioning class for CSS
    if (containerRef.current) {
      containerRef.current.classList.add('transitioning');
    }

    // Slide/fade transition for horizontal (left/right) movement
    if (transition === 'slide-horizontal') {
      const sectionsEls = containerRef.current.querySelectorAll('.homepage-section');
      const outgoing = sectionsEls[activeSection];
      const incoming = sectionsEls[sectionIndex];
      if (outgoing && incoming) {
        outgoing.classList.add('section-slide-out');
        incoming.classList.add('section-slide-in');
        incoming.style.visibility = 'visible';
        incoming.style.opacity = '1';
        // Remove classes after animation
        setTimeout(() => {
          outgoing.classList.remove('section-slide-out');
          outgoing.style.visibility = 'hidden';
          outgoing.style.opacity = '0';
          incoming.classList.remove('section-slide-in');
          setActiveSection(sectionIndex);
          setIsTransitioning(false);
          setTransitionType('');
          isScrolling.current = false; // Reset scroll flag
          if (containerRef.current) {
            containerRef.current.classList.remove('transitioning');
          }
        }, 800); // Increased to match CSS animation duration
      }
      return;
    }

    // Handle different transition types
    if (transition === 'expand-background' || transition === 'shrink-background') {
      setTimeout(() => {
        setActiveSection(sectionIndex);
        if (containerRef.current) {
          const targetY = sectionIndex * window.innerHeight;
          containerRef.current.style.transform = `translateY(-${targetY}px)`;
        }
      }, 50);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionType('');
        isScrolling.current = false; // Reset scroll flag
        if (containerRef.current) {
          containerRef.current.classList.remove('transitioning');
        }
      }, 1200); // Increased to match CSS animation duration
      
    } else if (transition === 'hero-to-features' || transition === 'features-to-hero') {
      setTimeout(() => {
        setActiveSection(sectionIndex);
        if (containerRef.current) {
          const targetY = sectionIndex * window.innerHeight;
          containerRef.current.style.transform = `translateY(-${targetY}px)`;
        }
      }, 50);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionType('');
        isScrolling.current = false; // Reset scroll flag
        if (containerRef.current) {
          containerRef.current.classList.remove('transitioning');
        }
      }, 1000); // Increased to match CSS animation duration
      
    } else if (transition === 'challenge-to-answers') {
      setTimeout(() => {
        setActiveSection(sectionIndex);
        if (containerRef.current) {
          const targetY = sectionIndex * window.innerHeight;
          containerRef.current.style.transform = `translateY(-${targetY}px)`;
        }
      }, 50);
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionType('');
        isScrolling.current = false; // Reset scroll flag
        if (containerRef.current) {
          containerRef.current.classList.remove('transitioning');
        }
      }, 1000); // Increased to match CSS animation duration
    } else {
      // Default instant transition
      setActiveSection(sectionIndex);
      if (containerRef.current) {
        const targetY = sectionIndex * window.innerHeight;
        containerRef.current.style.transform = `translateY(-${targetY}px)`;
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionType('');
        isScrolling.current = false; // Reset scroll flag
        if (containerRef.current) {
          containerRef.current.classList.remove('transitioning');
        }
      }, 600); // Increased to match CSS animation duration
    }
  }, [activeSection, isTransitioning, sections.length]);

  // Mouse wheel navigation with improved debouncing
  useEffect(() => {
    const handleWheel = (e) => {
      console.log('Wheel event detected:', e.deltaY, 'activeSection:', activeSection, 'isTransitioning:', isTransitioning, 'isScrolling:', isScrolling.current);
      
      e.preventDefault();
      e.stopPropagation();
      
      // Block all scroll events if currently transitioning or already processing scroll
      if (isScrolling.current || isTransitioning) {
        console.log('Blocked wheel event - transitioning or scrolling');
        return;
      }
      
      // Add threshold to prevent accidental scrolling from small movements
      const scrollThreshold = 20; // Further reduced threshold for better responsiveness
      if (Math.abs(e.deltaY) < scrollThreshold) {
        console.log('Wheel event below threshold');
        return;
      }
      
      // Set scrolling flag immediately
      isScrolling.current = true;
      
      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        // Scrolling down
        console.log('Scrolling down to section:', activeSection + 1);
        goToSection(activeSection + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        // Scrolling up
        console.log('Scrolling up to section:', activeSection - 1);
        goToSection(activeSection - 1);
      } else {
        // Reset scrolling flag if no section change
        console.log('No section change, resetting scroll flag');
        isScrolling.current = false;
      }
    };

    // Add event listeners to both window and document for better coverage
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, sections.length, isTransitioning, goToSection]);

  // Keyboard navigation with transition check
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' && activeSection < sections.length - 1) {
        goToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        goToSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections.length, isTransitioning, goToSection]);

  // Touch/swipe support for mobile with transition check
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isTransitioning) return;
    touchEnd.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isTransitioning || !touchStart.current || !touchEnd.current) return;
    
    const distance = touchStart.current - touchEnd.current;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && activeSection < sections.length - 1) {
      goToSection(activeSection + 1);
    }
    if (isDownSwipe && activeSection > 0) {
      goToSection(activeSection - 1);
    }
  };

  // Add homepage-active class to body and html for proper scrolling
  useEffect(() => {
    document.body.classList.add('homepage-active');
    document.documentElement.classList.add('homepage-active');
    
    return () => {
      document.body.classList.remove('homepage-active');
      document.documentElement.classList.remove('homepage-active');
    };
  }, []);

  // Fallback mechanism to reset scroll flags if they get stuck
  useEffect(() => {
    const resetScrollFlag = () => {
      if (isScrolling.current && !isTransitioning) {
        console.log('Resetting stuck scroll flag');
        isScrolling.current = false;
      }
    };

    const interval = setInterval(resetScrollFlag, 1000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('State changed - activeSection:', activeSection, 'isTransitioning:', isTransitioning, 'isScrolling:', isScrolling.current);
  }, [activeSection, isTransitioning]);

  return (
    <div className="homepage">
      {/* Navigation dots */}
      <ul className="side-dots">
        {sections.map((_, idx) => (
          <li
            key={idx}
            className={activeSection === idx ? 'active' : ''}
            onClick={() => !isTransitioning && goToSection(idx)}
          ></li>
        ))}
      </ul>

      {/* Sections container with transition data */}
      <div 
        className="sections-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={(e) => {
          console.log('Container wheel event:', e.deltaY);
          // This will be handled by the window event listener
        }}
        data-transition-type={transitionType}
        data-is-transitioning={isTransitioning}
        style={{
          transform: `translateY(-${activeSection * 100}vh)`,
          willChange: 'transform',
        }}
      >
        {sections.map((Section, idx) => (
          <div
            key={idx}
            className={`homepage-section ${
              activeSection === idx 
                ? 'section-active' 
                : 'section-inactive'
            }`}
            data-section-index={idx}
            style={{
              width: '100vw',
              height: '100vh',
              position: 'relative',
              visibility: activeSection === idx ? 'visible' : 'hidden',
              opacity: activeSection === idx ? 1 : 0,
              transition: 'opacity 0.3s, visibility 0.3s',
              // Force re-render when section becomes active
              key: `${idx}-${activeSection === idx ? 'active' : 'inactive'}`,
            }}
          >
            {Section}
          </div>
        ))}
      </div>
      
      {/* Progress indicator - you can animate this if desired */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar"
          style={{
            height: `${((activeSection + 1) / sections.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Homepage;