import React, { useEffect, useState } from 'react';

const COFFEE_TOTAL = 30;
const COFFEE_SPENT = 19.72;
const COFFEE_REMAINING = COFFEE_TOTAL - COFFEE_SPENT;
const ANIMATION_DURATION = 1000; // ms

const ChallengeSection = ({ active = true }) => {
  const [animatedSpent, setAnimatedSpent] = useState(0);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [leftAnimated, setLeftAnimated] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  useEffect(() => {
    if (active) {
      setLeftAnimated(true);
      // Trigger card animations after a delay
      setTimeout(() => setCardsAnimated(true), 600);
    } else {
      setLeftAnimated(false);
      setCardsAnimated(false);
    }
  }, [active]);

  useEffect(() => {
    if (!active) {
      setAnimatedSpent(0);
      setAnimatedPercent(0);
      return;
    }
    
    // Start animation after initial animations
    setTimeout(() => {
      let start;
      function animate(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const t = Math.min(1, elapsed / ANIMATION_DURATION);
        const easedT = 1 - Math.pow(1 - t, 3); // Ease out cubic
        setAnimatedSpent(COFFEE_SPENT * easedT);
        setAnimatedPercent((COFFEE_SPENT / COFFEE_TOTAL) * easedT);
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedSpent(COFFEE_SPENT);
          setAnimatedPercent(COFFEE_SPENT / COFFEE_TOTAL);
        }
      }
      requestAnimationFrame(animate);
    }, 1200);

    return () => {
      setAnimatedSpent(0);
      setAnimatedPercent(0);
    };
  }, [active]);

  const spentDollars = Math.floor(animatedSpent);
  const spentCents = (animatedSpent - spentDollars).toFixed(2).substring(2);
  const remaining = Math.max(0, COFFEE_TOTAL - animatedSpent).toFixed(2);
  const percent = Math.min(1, animatedPercent);

  return (
    <div className="challenge-section">
      <style jsx>{`
        .challenge-section {
          background: linear-gradient(135deg, #FFF4E0 0%, #f5e6c8 50%, #fddc90 100%);
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10rem;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }

        .challenge-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 20%, rgba(253, 158, 0, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(68, 35, 26, 0.05) 0%, transparent 50%);
          animation: ${active ? 'backgroundFloat 20s ease-in-out infinite' : 'none'};
          z-index: 1;
        }

        @keyframes backgroundFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(1deg); }
          66% { transform: translate(-20px, 20px) rotate(-1deg); }
        }

        .challenge-content-row {
          display: flex;
          width: 100%;
          max-width: 1800px;
          align-items: center;
          justify-content: space-between;
          padding: 0;
          box-sizing: border-box;
          position: relative;
          z-index: 2;
        }

        .challenge-left {
          flex: 1 1 45%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          color: #44221c;
          z-index: 2;
          padding-left: 0;
          opacity: 0;
          transform: translateX(-60px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .challenge-left-animate {
          opacity: 1;
          transform: translateX(0);
        }

        .challenge-title {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 14px;
          line-height: 1.08;
          text-align: left;
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          animation: ${leftAnimated ? 'titleReveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards' : 'none'};
        }

        @keyframes titleReveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .challenge-sub {
          font-size: 1.05rem;
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          margin-bottom: 14px;
          opacity: 0;
          animation: ${leftAnimated ? 'fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards' : 'none'};
        }

        .challenge-desc {
          font-size: 0.98rem;
          background: linear-gradient(135deg, #fd9e00, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          margin-bottom: 0;
          max-width: 420px;
          text-align: left;
          opacity: 0;
          animation: ${leftAnimated ? 'fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.9s forwards' : 'none'};
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .challenge-link {
          color: #44221c;
          font-weight: 700;
          text-decoration: underline;
          position: relative;
          transition: all 0.3s ease;
        }

        .challenge-link:hover {
          color: #fd9e00;
          transform: translateY(-2px);
        }

        .challenge-right {
          flex: 1 1 55%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          min-width: 500px;
          padding-right: 0;
        }

        .challenge-cards-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .challenge-coffee-card {
          position: absolute;
          top: -80px;
          right: -20px;
          // background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          pointer-events: auto;
          opacity: 0;
          transform: translateY(30px) rotate(3deg);
          animation: ${cardsAnimated ? 'cardFloatIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1s forwards' : 'none'};
        }

        .challenge-overlay-card {
          position: absolute;
          left: -60px;
          top: 50%;
          transform: translateY(-50%) rotate(-2deg);
          // background: rgba(253, 158, 0, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          color: white;
          box-shadow: 0 8px 32px rgba(253, 158, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          pointer-events: auto;
          opacity: 0;
          animation: ${cardsAnimated ? 'cardSlideIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.2s forwards' : 'none'};
        }

        .challenge-progress-card {
          position: absolute;
          bottom: -40px;
          left: 40px;
          // background: rgba(253, 158, 0, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          color: white;
          box-shadow: 0 8px 32px rgba(253, 158, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          pointer-events: auto;
          opacity: 0;
          transform: translateY(-30px) rotate(1deg);
          animation: ${cardsAnimated ? 'cardBounceIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.4s forwards' : 'none'};
        }

        @keyframes cardFloatIn {
          0% { opacity: 0; transform: translateY(30px) rotate(3deg) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) rotate(3deg) scale(1); }
        }

        @keyframes cardSlideIn {
          0% { opacity: 0; transform: translateY(-50%) translateX(-30px) rotate(-2deg) scale(0.9); }
          100% { opacity: 1; transform: translateY(-50%) translateX(0) rotate(-2deg) scale(1); }
        }

        @keyframes cardBounceIn {
          0% { opacity: 0; transform: translateY(30px) rotate(1deg) scale(0.9); }
          60% { transform: translateY(-10px) rotate(1deg) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) rotate(1deg) scale(1); }
        }

        .challenge-coffee-card:hover {
          transform: translateY(-5px) rotate(3deg) scale(1.05);
          box-shadow: 0 16px 48px rgba(0,0,0,0.15);
        }

        .challenge-overlay-card:hover {
          transform: translateY(-50%) translateX(5px) rotate(-2deg) scale(1.05);
          box-shadow: 0 16px 48px rgba(253, 158, 0, 0.4);
        }

        .challenge-progress-card:hover {
          transform: translateY(-8px) rotate(1deg) scale(1.05);
          box-shadow: 0 16px 48px rgba(253, 158, 0, 0.4);
        }

        .challenge-image-wrapper {
          position: relative;
          width: 700px;
          height: 400px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          background: #eee;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          opacity: ${active ? 1 : 0};
          transform: ${active ? 'translateX(0) scale(1) rotateY(0deg)' : 'translateX(80px) scale(0.9) rotateY(15deg)'};
          animation: ${active ? 'imageWrapperReveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards' : 'none'};
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .challenge-image-wrapper:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 80px rgba(0,0,0,0.2);
        }

        @keyframes imageWrapperReveal {
          0% { 
            opacity: 0; 
            transform: translateX(80px) scale(0.9) rotateY(15deg);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1) rotateY(0deg);
          }
        }

        .challenge-image {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          display: block;
          filter: brightness(1.1) contrast(1.05);
          transition: filter 0.3s ease;
          border: 2px solid red; /* Debug border */
          background: #f0f0f0; /* Debug background */
        }

        .challenge-image:hover {
          filter: brightness(1.2) contrast(1.1);
        }

        .coffee-title {
          font-size: 1.25rem;
          font-weight: 800;
          display: block;
          margin-bottom: 6px;
          color: #44221c;
        }

        .coffee-amount-row {
          font-size: 2.3rem;
          font-weight: 800;
          margin-bottom: 2px;
          display: flex;
          align-items: flex-end;
          color: #44221c;
        }

        .coffee-currency {
          font-size: 1.2rem;
          margin-right: 2px;
          animation: ${animatedSpent > 0 ? 'pulse 2s ease-in-out infinite' : 'none'};
        }

        .coffee-amount {
          font-size: 2.3rem;
          font-weight: 800;
          animation: ${animatedSpent > 0 ? 'numberCount 0.5s ease-out' : 'none'};
        }

        .coffee-cents {
          font-size: 1.1rem;
          margin-left: 1px;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes numberCount {
          0% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .coffee-sub, .coffee-remaining {
          font-size: 1.05rem;
          font-weight: 400;
          color: #666;
        }

        .coffee-progress-bar {
          background: rgba(68, 35, 26, 0.1);
          border-radius: 12px;
          height: 12px;
          margin-top: 10px;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .coffee-progress-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
          animation: ${percent > 0 ? 'shimmer 2s ease-in-out infinite' : 'none'};
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .coffee-progress-fill {
          background: linear-gradient(135deg, #fd9e00 0%, #fcba36 100%);
          height: 100%;
          border-radius: 12px;
          transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(253, 158, 0, 0.3);
        }

        .coffee-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          animation: ${percent > 0.1 ? 'progressShine 3s ease-in-out infinite' : 'none'};
        }

        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .challenge-overlay-title {
          font-size: 1.45rem;
          font-weight: 800;
          display: block;
          margin-bottom: 8px;
        }

        .challenge-overlay-desc {
          font-size: 1.08rem;
          font-weight: 400;
          opacity: 0.9;
        }

        .challenge-progress-label {
          font-size: 1.08rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .challenge-progress-days {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .day {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          color: #fff;
          font-size: 1.08rem;
          font-weight: 700;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0.5);
          animation: ${cardsAnimated ? 'dayReveal 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards' : 'none'};
        }

        .day:nth-child(1) { animation-delay: 1.6s; }
        .day:nth-child(2) { animation-delay: 1.7s; }
        .day:nth-child(3) { animation-delay: 1.8s; }
        .day:nth-child(4) { animation-delay: 1.9s; }
        .day:nth-child(5) { animation-delay: 2.0s; }
        .day:nth-child(6) { animation-delay: 2.1s; }
        .day:nth-child(7) { animation-delay: 2.2s; }

        @keyframes dayReveal {
          0% { opacity: 0; transform: scale(0.5) rotate(180deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .day.active {
          background: linear-gradient(135deg, #fd9e00 0%, #f7931e 100%);
          color: #fff;
          border: 2px solid #fd9e00;
          box-shadow: 0 4px 16px rgba(253, 158, 0, 0.3);
          animation: ${cardsAnimated ? 'dayReveal 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards, dayPulse 2s ease-in-out infinite' : 'none'};
        }

        @keyframes dayPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(253, 158, 0, 0.3); }
          50% { transform: scale(1.1); box-shadow: 0 6px 24px rgba(253, 158, 0, 0.5); }
        }

        .day:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 8px 24px rgba(253, 158, 0, 0.4);
        }

        @media (max-width: 1300px) {
          .challenge-image-wrapper {
            width: 420px;
            height: 220px;
            border-radius: 16px;
          }
          
          .challenge-coffee-card {
            top: -60px;
            right: -15px;
            padding: 16px;
          }
          
          .challenge-overlay-card {
            left: -40px;
            padding: 16px;
          }
          
          .challenge-progress-card {
            bottom: -30px;
            left: 30px;
            padding: 16px;
          }
        }

        @media (max-width: 1000px) {
          .challenge-section {
            padding: 0 2rem;
          }
          
          .challenge-content-row {
            flex-direction: column;
            align-items: flex-start;
            padding: 30px 10px;
          }
          
          .challenge-left,
          .challenge-left-animate {
            opacity: 1;
            transform: none;
          }
          
          .challenge-right {
            width: 100%;
            min-width: 0;
            align-items: center;
            margin-top: 2rem;
            padding-right: 0;
            justify-content: center;
          }
          
          .challenge-image-wrapper {
            width: 95vw;
            max-width: 500px;
            height: 300px;
            border-radius: 14px;
          }
          
          .challenge-cards-container {
            position: static;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
            width: 100%;
            align-items: center;
            pointer-events: auto;
          }
          
          .challenge-coffee-card,
          .challenge-overlay-card,
          .challenge-progress-card {
            position: static;
            width: 100%;
            max-width: 400px;
            margin: 0;
            opacity: 1;
            transform: none !important;
            animation: none;
          }
          
          .challenge-progress-days {
            gap: 8px;
            justify-content: center;
          }
          
          .day {
            width: 24px;
            height: 24px;
            font-size: 0.9rem;
          }
        }
      `}</style>
      
      <div className="challenge-content-row">
        <div className={`challenge-left${leftAnimated ? ' challenge-left-animate' : ''}`}>
          <h1 className="challenge-title">Leave the sleepless<br />nights to Lumeo</h1>
          <p className="challenge-sub">Relax, We got this.</p>
          <p className="challenge-desc">
            Lumeo works nonstop—identifying trends, predicting what's next, and always thinking of new <a href="#" className="challenge-link">ways for you to save</a>.
          </p>
        </div>
        <div className="challenge-right">
          <div className="challenge-cards-container">
            <div className="challenge-coffee-card">
              <div className="coffee-title">Coffee challenge</div>
              <div className="coffee-amount-row">
                <span className="coffee-currency">$</span>
                <span className="coffee-amount">{spentDollars}</span>
                <span className="coffee-cents">.{spentCents}</span>
              </div>
              <div className="coffee-sub">Spent of $30 spend limit</div>
              <div className="coffee-remaining">${remaining} remaining</div>
              <div className="coffee-progress-bar">
                <div className="coffee-progress-fill" style={{width: `${percent * 100}%`}}></div>
              </div>
            </div>
            <div className="challenge-overlay-card">
              <div className="challenge-overlay-title">Your challenge</div>
              <div className="challenge-overlay-desc">This week you have to reduce your spending on take out coffee</div>
            </div>
            <div className="challenge-progress-card">
              <div className="challenge-progress-label">Day 4 of 7</div>
              <div className="challenge-progress-days">
                <span className="day active">S</span>
                <span className="day active">M</span>
                <span className="day active">T</span>
                <span className="day active">W</span>
                <span className="day">T</span>
                <span className="day">F</span>
                <span className="day">S</span>
              </div>
            </div>
          </div>
          <div className="challenge-image-wrapper">
            <img 
              src="/images/challengepic.PNG" 
              alt="Challenge visualization" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '28px',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;