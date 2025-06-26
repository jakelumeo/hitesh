import React from 'react';
import './UnderstandSection.css';

const UnderstandSection = ({ active, isTransitioning, transitionType, transitionProgress = 0 }) => {
  // Only show background when active or during transitions
  const shouldShowBackground = active || (isTransitioning && (transitionType === 'expand-background' || transitionType === 'shrink-background'));
  
  // Calculate frame dimensions based on transition progress (reverse of MoneyTalks)
  const framePadding = transitionProgress ? 40 * transitionProgress : 0; // Start with 0 padding, increase to 40px
  const borderRadius = transitionProgress ? 36 * transitionProgress : 0; // Start with 0 radius, increase to 36px
  const scale = transitionProgress ? 1.5 - (0.5 * transitionProgress) : 1.5; // Scale from 1.5 to 1
  
  return (
    <div className={`understand-section ${active ? 'active' : ''}`}>
      {/* Frame container that grows during reverse transition */}
      <div
        className="understand-frame"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: `calc(100vw - ${framePadding * 2}px)`,
          height: `calc(100vh - ${framePadding * 2}px)`,
          maxWidth: '1800px',
          maxHeight: '1200px',
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          boxShadow: transitionProgress 
            ? `0 ${4 * transitionProgress}px ${32 * transitionProgress}px rgba(0,0,0,${0.07 * transitionProgress})`
            : 'none',
          transition: transitionProgress ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: shouldShowBackground ? 1 : -1,
          background: 'transparent',
          opacity: shouldShowBackground ? 1 : 0,
          visibility: shouldShowBackground ? 'visible' : 'hidden'
        }}
      >
        {/* Background image that fills the frame */}
        <div
          className="understand-background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/Moneytalksback.PNG')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: `${borderRadius}px`
          }}
        />
      </div>
      
      {/* Content overlay that adjusts during transition */}
      <div 
        className="understand-overlay"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: transitionProgress 
            ? `${80 - (40 * transitionProgress)}px ${80 - (40 * transitionProgress)}px`
            : '0 80px',
          transform: transitionProgress ? `scale(${1 - (0.1 * transitionProgress)})` : 'scale(1)',
          transition: transitionProgress ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          opacity: shouldShowBackground ? 1 : 0,
          visibility: shouldShowBackground ? 'visible' : 'hidden'
        }}
      >
        <div className="understand-left">
          <h1 className="understand-title">
            Understand<br />
            your financial<br />
            life like<br />
            never before
          </h1>
          <p className="understand-desc">
            Millions of people rely on Lumeo to get to grips with their financial lives thanks to expert-level insights.
          </p>
          <p className="understand-desc">
            See what you earn, what you owe, and get ready for what's next.
          </p>
          <div className="expense-list">
            <div className="expense-item">
              <span className="expense-icon">🧾</span>
              <span className="expense-label">Bills</span>
              <span className="expense-amount">$295.65</span>
            </div>
            <div className="expense-item">
              <span className="expense-icon">🛒</span>
              <span className="expense-label">Transport</span>
              <span className="expense-amount">$54.32</span>
            </div>
            <div className="expense-item">
              <span className="expense-icon">🏦</span>
              <span className="expense-label">Bank charges</span>
              <span className="expense-amount">$23.99</span>
            </div>
          </div>
        </div>
        <div className="understand-right">
          <div className="budget-card">
            <h4>Budget</h4>
            <p className="budget-amount">
              $68.<span>70</span>
            </p>
            <p className="budget-limit">Left to spend of $500 limit</p>
            <div className="budget-timeline">
              <span>1 day to go</span>
              <span>$18.32 per day</span>
            </div>
            <div className="budget-progress-bar">
              <div style={{ width: '15%' }}></div>
            </div>
            <div className="budget-summary">
              <div className="summary-item">
                <p>$1,340.00</p>
                <span>Incoming</span>
              </div>
              <div className="summary-item">
                <p>$431.30</p>
                <span>Outgoing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandSection;