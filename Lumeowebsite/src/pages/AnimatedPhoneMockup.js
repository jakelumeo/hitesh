import React, { useEffect, useRef, useState } from 'react';
import useInView from './useInView';
import './AnimatedPhoneMockup.css';

const graphPoints = [
  { x: 0, y: 80, amount: 0 },
  { x: 10, y: 75, amount: 2 },
  { x: 20, y: 73, amount: 4 },
  { x: 30, y: 70, amount: 7 },
  { x: 40, y: 68, amount: 10 },
  { x: 50, y: 65, amount: 14 },
  { x: 60, y: 62, amount: 18 },
  { x: 70, y: 60, amount: 23 },
  { x: 80, y: 57, amount: 29 },
  { x: 90, y: 54, amount: 36 },
  { x: 100, y: 50, amount: 45 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const AnimatedPhoneMockup = () => {
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [following, setFollowing] = useState(0);
  const [graphProgress, setGraphProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const animationRef = useRef();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate numbers and graph only when in view and not already animated
  useEffect(() => {
    if (!inView || hasAnimated) return;
    setHasAnimated(true);
    let start = null;
    const duration = 1800; // ms
    function animateNumbers(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setFollowers(Math.floor(22000000 * progress));
      setPosts(Math.floor(333 * progress));
      setFollowing(Math.floor(419 * progress));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateNumbers);
      }
    }
    animationRef.current = requestAnimationFrame(animateNumbers);
    // Animate graph
    start = null;
    function animateGraph(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setGraphProgress(progress);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateGraph);
      }
    }
    animationRef.current = requestAnimationFrame(animateGraph);
    return () => cancelAnimationFrame(animationRef.current);
  }, [inView, hasAnimated]);

  // Calculate animated polyline points
  const getAnimatedPolyline = () => {
    const total = graphPoints.length;
    const shown = Math.floor(graphProgress * (total - 1)) + 1;
    let points = graphPoints.slice(0, shown);
    // Interpolate last point
    if (shown < total) {
      const prev = graphPoints[shown - 1];
      const next = graphPoints[shown];
      const t = (graphProgress * (total - 1)) % 1;
      points.push({
        x: lerp(prev.x, next.x, t),
        y: lerp(prev.y, next.y, t),
      });
    }
    return points.map(p => `${p.x},${p.y}`).join(' ');
  };

  // Only show circles for points that are currently visible in the animation
  const getVisiblePoints = () => {
    const total = graphPoints.length;
    const shown = Math.floor(graphProgress * (total - 1)) + 1;
    return graphPoints.slice(0, shown);
  };

  return (
    <div className="phone-mockup-outer" ref={ref}>
      <div className="phone-mockup-inner">
        <div className="phone-header">
          <span className="phone-time">9:41</span>
          <span className="phone-title">LUMEO</span>
          <span className="phone-avatar"></span>
        </div>
        <div className="phone-tabs">
          <button className="active">Your Profile</button>
          <button>Your Stats</button>
          <button>Your Journey</button>
        </div>
        <div className="phone-stats-row">
          <div className="phone-stat">
            <div className="stat-label">Posts</div>
            <div className="stat-value">{posts}</div>
          </div>
          <div className="phone-stat">
            <div className="stat-label">Followers</div>
            <div className="stat-value">{(followers/1000000).toFixed(0)}M</div>
          </div>
          <div className="phone-stat">
            <div className="stat-label">Following</div>
            <div className="stat-value">{following}</div>
          </div>
        </div>
        <div className="phone-graph-block">
          <div className="phone-graph-label">Savings</div>
          <div style={{position:'relative'}}>
            <svg viewBox="0 0 100 80" width="100%" height="60" className="phone-graph-svg">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={getAnimatedPolyline()}
              />
              {getVisiblePoints().map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={2.5}
                  fill="#3b82f6"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
              <rect x="0" y="0" width="100" height="80" fill="none" />
            </svg>
            {hoveredIdx !== null && (
              <div
                className="graph-tooltip"
                style={{
                  position: 'absolute',
                  left: `calc(${graphPoints[hoveredIdx].x}% - 18px)` ,
                  top: `${graphPoints[hoveredIdx].y - 18}px`,
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #3b82f6',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: 10,
                  pointerEvents: 'none',
                  zIndex: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                ${graphPoints[hoveredIdx].amount}K saved
              </div>
            )}
          </div>
        </div>
        <div className="phone-posts-block">
          <div className="phone-post">
            <span className="phone-avatar-small"></span>
            <span className="phone-post-user">Elynn Lee <span className="trophy">🏆</span> <span className="handle">@ElynnLeeSaves</span> · 2d</span>
            <div className="phone-post-content">OMG! GUYS WHOLE FOODS HAS CHICKEN ON SALE!! GET IT NOW!! I SAVED $18!!! #FREECOFFEE4THEWEEK</div>
            <div className="phone-post-meta">Likes 🏆 Comments 💬 Re-share 🔄</div>
          </div>
          <div className="phone-post">
            <span className="phone-avatar-small"></span>
            <span className="phone-post-user">Elynn Lee <span className="trophy">🏆</span> <span className="handle">@ElynnLeeSaves</span> · 2d</span>
            <div className="phone-post-content">BUY ONE GET ONE FREE CELSIUS ENERGY AT CVS RN 😂😂 #W40thSt</div>
            <div className="phone-post-meta">Likes 🏆 Comments 💬 Re-share 🔄</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPhoneMockup; 