import React, { useEffect, useRef, useState } from 'react';
import './AnimatedSavingsGauge.css';

const MAX = 90000;
const TARGET = 41253;
const DURATION = 1800; // ms
const RADIUS = 90;
const CENTER_X = 110;
const CENTER_Y = 130; // move center down for semi-circle
const START_ANGLE = Math.PI; // 180deg (left)
const END_ANGLE = 2 * Math.PI; // 360deg (right, for left-to-right arc)
const SEMI_CIRCUM = Math.PI * RADIUS; // half circumference
const PERCENT = TARGET / MAX;

// Helper to get arc path for a semi-circle (left to right)
function describeSemiArc(cx, cy, r, startAngle, endAngle) {
  const start = {
    x: cx + r * Math.cos(startAngle),
    y: cy + r * Math.sin(startAngle),
  };
  const end = {
    x: cx + r * Math.cos(endAngle),
    y: cy + r * Math.sin(endAngle),
  };
  return [
    'M', start.x, start.y,
    'A', r, r, 0, 0, 1, end.x, end.y
  ].join(' ');
}

const AnimatedSavingsGauge = ({ active }) => {
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef();

  useEffect(() => {
    if (!active) {
      setValue(0);
      setProgress(0);
      return;
    }
    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / DURATION, 1);
      setValue(Math.floor(TARGET * t));
      setProgress(t);
      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [active]);

  // Arc calculations
  const arcLength = SEMI_CIRCUM * PERCENT * progress;
  const bgPath = describeSemiArc(CENTER_X, CENTER_Y, RADIUS, START_ANGLE, END_ANGLE);
  const fgPath = describeSemiArc(CENTER_X, CENTER_Y, RADIUS, START_ANGLE, END_ANGLE);

  return (
    <div className="savings-gauge-container">
      <div className="savings-dropdown">Savings <span className="dropdown-arrow">▼</span></div>
      <svg width="220" height="150" className="savings-gauge-svg">
        {/* Background semi-circle */}
        <path
          d={bgPath}
          stroke="#fde6c0"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        {/* Animated arc */}
        <path
          d={fgPath}
          stroke="#fd9e00"
          strokeWidth="16"
          fill="none"
          strokeDasharray={SEMI_CIRCUM}
          strokeDashoffset={SEMI_CIRCUM - arcLength}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.2s' }}
        />
      </svg>
      <div className="savings-gauge-center savings-gauge-center-semi">
        <div className="savings-gauge-label">Savings</div>
        <div className="savings-gauge-value">${value.toLocaleString()}</div>
        <div className="savings-gauge-sublabel">Out of ${MAX.toLocaleString()}</div>
      </div>
      <div className="savings-gauge-periods">
        <span>W</span>
        <span className="active">M</span>
        <span>Y</span>
      </div>
    </div>
  );
};

export default AnimatedSavingsGauge; 