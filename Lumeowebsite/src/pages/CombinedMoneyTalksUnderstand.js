import React, { useState, useRef } from 'react';
import './MoneyTalksSection.css';
import './UnderstandSection.css';

const CombinedMoneyTalksUnderstand = ({ 
  active, 
  isTransitioning, 
  transitionType, 
  transitionProgress = 0,
  currentSection // This will be 2 for the combined section
}) => {
  const [internalState, setInternalState] = useState('moneytalks'); // 'moneytalks' or 'understand'
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('forward'); // 'forward' or 'backward'
  const [showMoneyTalks, setShowMoneyTalks] = useState(true);
  const [showUnderstand, setShowUnderstand] = useState(false);
  const sectionRef = useRef(null);

  // Handle scroll/key transitions
  React.useEffect(() => {
    if (!active || !sectionRef.current) return;
    const handleWheel = (e) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      if (currentSection === 2) {
        if (e.deltaY > 0 && internalState === 'moneytalks') {
          e.preventDefault();
          triggerTransition('understand', 'forward');
        } else if (e.deltaY < 0 && internalState === 'understand') {
          e.preventDefault();
          triggerTransition('moneytalks', 'backward');
        }
      }
    };
    const handleKeyDown = (e) => {
      if (isAnimating || currentSection !== 2) return;
      if (e.key === 'ArrowDown' && internalState === 'moneytalks') {
        e.preventDefault();
        triggerTransition('understand', 'forward');
      } else if (e.key === 'ArrowUp' && internalState === 'understand') {
        e.preventDefault();
        triggerTransition('moneytalks', 'backward');
      }
    };
    const section = sectionRef.current;
    section.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      section.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, currentSection, internalState, isAnimating]);

  // Animation trigger
  function triggerTransition(target, dir) {
    setIsAnimating(true);
    setDirection(dir);
    if (target === 'understand') setShowUnderstand(true);
    if (target === 'moneytalks') setShowMoneyTalks(true);
    setTimeout(() => {
      setInternalState(target);
      setIsAnimating(false);
      if (target === 'understand') setShowMoneyTalks(false);
      if (target === 'moneytalks') setShowUnderstand(false);
    }, 400); // match CSS duration
  }

  return (
    <div className="combined-section" ref={sectionRef} style={{position:'relative',overflow:'hidden'}}>
      {/* MoneyTalks container */}
      {showMoneyTalks && (
        <div
          className={`money-talks-frame${
            isAnimating && internalState === 'moneytalks' && direction==='forward' ? ' slide-out-left-fade' : ''
          }${
            isAnimating && internalState === 'understand' && direction==='backward' ? ' slide-in-right-fade' : ''
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: internalState === 'moneytalks' ? 2 : 1,
            opacity: internalState === 'moneytalks' || (isAnimating && direction==='backward') ? 1 : 0,
            pointerEvents: internalState === 'moneytalks' ? 'auto' : 'none',
            transition: 'opacity 0.3s',
            background: 'transparent',
          }}
        >
          {/* Background image */}
          <div className="money-talks-background" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundImage: "url('/images/Moneytalksback.PNG')",backgroundSize:'cover',backgroundPosition:'center'}} />
          {/* Content overlay */}
          <div className="money-talks-content" style={{position:'absolute',left:0,bottom:0,padding:'48px 64px',zIndex:2,textAlign:'left',width:'60%'}}>
            <h2>Money talks.</h2>
            <h2>Cleo talks back</h2>
          </div>
        </div>
      )}
      {/* Understand container */}
      {showUnderstand && (
        <div
          className={`understand-frame${
            isAnimating && internalState === 'understand' && direction==='forward' ? ' slide-in-right-fade' : ''
          }${
            isAnimating && internalState === 'moneytalks' && direction==='backward' ? ' slide-out-left-fade' : ''
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: internalState === 'understand' ? 2 : 1,
            opacity: internalState === 'understand' || (isAnimating && direction==='forward') ? 1 : 0,
            pointerEvents: internalState === 'understand' ? 'auto' : 'none',
            transition: 'opacity 0.3s',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background image */}
          <div className="understand-background" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundImage: "url('/images/Moneytalksback.PNG')",backgroundSize:'cover',backgroundPosition:'center'}} />
          {/* Content overlay */}
          <div className="understand-overlay" style={{position:'relative',zIndex:2,display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'space-between',padding:'0 80px'}}>
            <div className="understand-left">
              <h1 className="understand-title">
                Understand<br />your financial<br />life like<br />never before
              </h1>
              <p className="understand-desc">Millions of people rely on Cleo to get to grips with their financial lives thanks to expert-level insights.</p>
              <p className="understand-desc">See what you earn, what you owe, and get ready for what's next.</p>
              <div className="expense-list">
                <div className="expense-item"><span className="expense-icon">🧾</span><span className="expense-label">Bills</span><span className="expense-amount">$295.65</span></div>
                <div className="expense-item"><span className="expense-icon">🛒</span><span className="expense-label">Transport</span><span className="expense-amount">$54.32</span></div>
                <div className="expense-item"><span className="expense-icon">🏦</span><span className="expense-label">Bank charges</span><span className="expense-amount">$23.99</span></div>
              </div>
            </div>
            <div className="understand-right">
              <div className="budget-card">
                <h4>Budget</h4>
                <p className="budget-amount">$68.<span>70</span></p>
                <p className="budget-limit">Left to spend of $500 limit</p>
                <div className="budget-timeline"><span>1 day to go</span><span>$18.32 per day</span></div>
                <div className="budget-progress-bar"><div style={{ width: '15%' }}></div></div>
                <div className="budget-summary">
                  <div className="summary-item"><p>$1,340.00</p><span>Incoming</span></div>
                  <div className="summary-item"><p>$431.30</p><span>Outgoing</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedMoneyTalksUnderstand; 