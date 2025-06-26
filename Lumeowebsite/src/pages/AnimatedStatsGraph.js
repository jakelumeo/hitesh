import React, { useEffect, useRef, useState } from 'react';
import './AnimatedStatsGraph.css';

const statsConfig = [
  { label: 'Posts', value: 333 },
  { label: 'Followers', value: 159000000, format: v => `${Math.floor(v/1000000)}M` },
  { label: 'Following', value: 419 },
];

const days = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
const actualSavings = [0, 500, 1200, 2000, 3200, 5000];
const projectedSavings = [0, 400, 1000, 1800, 2700, 4200];

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

const AnimatedStatsGraph = ({ className = '', active }) => {
  // Animated stats (raw values)
  const [displayStats, setDisplayStats] = useState(statsConfig.map(() => 0));
  // Animated graph progress (0 to 1)
  const [progress, setProgress] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const [statsDone, setStatsDone] = useState(false);
  const animationRef = useRef();

  // Animate stats counting up only when active
  useEffect(() => {
    if (!active) {
      setDisplayStats(statsConfig.map(() => 0));
      setStatsDone(false);
      setProgress(0);
      setShowLabel(false);
      return;
    }
    let frame;
    let start;
    function animateStats(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const duration = 1200;
      const t = Math.min(1, elapsed / duration);
      setDisplayStats(statsConfig.map(s => easeOutExpo(t) * s.value));
      if (t < 1) {
        frame = requestAnimationFrame(animateStats);
      } else {
        setDisplayStats(statsConfig.map(s => s.value));
        setStatsDone(true);
      }
    }
    frame = requestAnimationFrame(animateStats);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  // Animate graph line drawing (only after stats are done)
  useEffect(() => {
    if (!active || !statsDone) return;
    let frame;
    let start;
    function animateGraph(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const duration = 1600;
      const t = Math.min(1, elapsed / duration);
      setProgress(easeOutExpo(t));
      if (t < 1) {
        frame = requestAnimationFrame(animateGraph);
      } else {
        setProgress(1);
        setTimeout(() => setShowLabel(true), 300);
      }
    }
    frame = requestAnimationFrame(animateGraph);
    return () => cancelAnimationFrame(frame);
  }, [active, statsDone]);

  // SVG graph dimensions
  const width = 300, height = 160, padding = 32;
  const maxY = 5000;
  const points = actualSavings.map((v, i) => [
    padding + (i * (width - 2 * padding) / (days.length - 1)),
    height - padding - (v * (height - 2 * padding) / maxY)
  ]);
  const projPoints = projectedSavings.map((v, i) => [
    padding + (i * (width - 2 * padding) / (days.length - 1)),
    height - padding - (v * (height - 2 * padding) / maxY)
  ]);
  // Animated line path
  const getLinePath = (pts, pct) => {
    const n = Math.floor((pts.length - 1) * pct);
    let path = '';
    for (let i = 0; i <= n; ++i) {
      path += (i === 0 ? 'M' : 'L') + pts[i][0] + ' ' + pts[i][1] + ' ';
    }
    if (n < pts.length - 1) {
      // Interpolate to next point
      const [x1, y1] = pts[n];
      const [x2, y2] = pts[n + 1];
      const segPct = (pct * (pts.length - 1)) - n;
      const x = x1 + (x2 - x1) * segPct;
      const y = y1 + (y2 - y1) * segPct;
      path += 'L' + x + ' ' + y + ' ';
    }
    return path;
  };

  return (
    <div className={`stats-graph-mockup ${className}`}>
      <div className="stats-row">
        {statsConfig.map((stat, i) => {
          const isFinal = Math.round(displayStats[i]) === stat.value;
          let displayValue = Math.round(displayStats[i]);
          if (stat.format) displayValue = stat.format(displayStats[i]);
          return (
            <div className="stat-box" key={stat.label}>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-value${isFinal ? ' stat-animated' : ''}`}>
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>
      <div className="graph-area">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Projected Savings */}
          <path
            d={getLinePath(projPoints, progress)}
            stroke="#b3c6ff"
            strokeWidth="4"
            fill="none"
            style={{ opacity: 0.5 }}
          />
          {/* Actual Savings */}
          <path
            d={getLinePath(points, progress)}
            stroke="#3366ff"
            strokeWidth="5"
            fill="none"
            style={{ filter: 'drop-shadow(0 2px 6px #3366ff33)' }}
          />
          {/* Dots and label at the end */}
          {progress === 1 && (
            <>
              {points.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 6 : 4} fill={i === points.length - 1 ? '#3366ff' : '#fff'} stroke="#3366ff" strokeWidth={i === points.length - 1 ? 3 : 2} />
              ))}
              {showLabel && (
                <g>
                  <rect x={points[points.length - 1][0] - 18} y={points[points.length - 1][1] - 28} width="36" height="22" rx="6" fill="#3366ff" />
                  <text x={points[points.length - 1][0]} y={points[points.length - 1][1] - 13} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">5K</text>
                </g>
              )}
            </>
          )}
          {/* Y axis labels */}
          {[1, 2, 3, 4].map(i => (
            <text key={i} x={width - padding + 8} y={height - padding - (i * (height - 2 * padding) / 4) + 5} fontSize="13" fill="#bdbdbd">{i}K</text>
          ))}
          {/* X axis labels */}
          {days.map((d, i) => (
            <text key={d} x={padding + (i * (width - 2 * padding) / (days.length - 1))} y={height - padding + 22} fontSize="13" fill="#bdbdbd" textAnchor="middle">{d}</text>
          ))}
        </svg>
        <div className="graph-legend">
          <span className="dot actual" /> Actual Savings
          <span className="dot projected" /> Projected Savings
        </div>
      </div>
    </div>
  );
};

export default AnimatedStatsGraph; 