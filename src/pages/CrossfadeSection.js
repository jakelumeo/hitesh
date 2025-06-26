import React from 'react';
import './CrossfadeSection.css'; // Include relevant styles

const CrossfadeSection = ({ fade }) => {
  return (
    <div className="crossfade-bg-section">
      <div className="crossfade-bg" />
      <div className="crossfade-content money-talks-content" style={{ opacity: 1 - fade }}>
        <h2>Money talks.</h2>
        <h2>Cleo talks back</h2>
      </div>
      <div className="crossfade-content understand-content" style={{ opacity: fade }}>
        <h2>Understand your financial life like never before</h2>
        <p>
          Millions of people rely on Cleo to get to grips with their financial lives thanks to
          expert-level insights.
        </p>
        <p>See what you earn, what you owe, and get ready for what's next.</p>
        <div className="expense-list">
          <div className="expense-item">
            <span></span> Bills <span>$295.65</span>
          </div>
          <div className="expense-item">
            <span></span> Transport <span>$54.32</span>
          </div>
          <div className="expense-item">
            <span></span> Bank charges <span>$23.99</span>
          </div>
        </div>
        <div className="budget-card">
          <h4>Budget</h4>
          <p className="budget-amount">
            $68.<span>70</span>
          </p>
          <p className="budget-limit">Left to spend of $500 limit</p>
          <div className="budget-progress-bar">
            <div style={{ width: '15%' }}></div>
          </div>
          <div className="budget-timeline">
            <span>1 day to go</span>
            <span>$18.32 per day</span>
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
  );
};

export default CrossfadeSection; 