import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Products.css';
import FAQ from './FAQ';

const Products = () => {
  useScrollAnimation();

  return (
    <div className="products-page">
      <div className="budget-your-way-section animate-on-scroll fade-in">
        <div className="budget-content">
          <h1>The Money<br />App.</h1>
          <div className="feature-box">
            <ul>
              <li>Win all your money goals and your life</li>
              <li>Talk with Lumeo, your favorite finance friend</li>
              <li>Gamified saving challenges with leaderboards</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="join-section animate-on-scroll fade-in">
        <div className="stars">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
        <h3>Join millions of Lumeo subscribers</h3>
        <p>
          Join lumeo on 
                <button className="store-button">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }} viewBox="0 0 16 16">
                    <path d="M11.182.008C10.148-.03 9.05.235 8.058.715c-.992.48-1.803 1.228-2.494 2.06C4.823 3.687 4.157 4.597 4.015 5.586c-.143.989.358 2.053.97 2.83.613.776 1.48 1.346 2.414 1.638.934.292 1.928.24 2.84-.136.913-.377 1.715-.967 2.328-1.693.613-.726.98-1.63.98-2.588 0-.02-.002-.04-.002-.06a4.93 4.93 0 0 0-1.558-3.55C12.37.818 11.782.262 11.182.008ZM10.275 1.132c.571.492 1.024 1.21 1.024 1.956 0 .04-.002.08-.006.12a3.48 3.48 0 0 0-1.998-1.19c.744-.333 1.35-.37 1.998.114Z"/>
                </svg> */}
                App Store
            </button>
            and
            <button className="store-button">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }} viewBox="0 0 16 16">
                    <path d="M14.222 9.374c1.037-.61.998-1.484-.048-1.708L2.92 1.713A2.5 2.5 0 0 0 .092 3.857v8.286a2.5 2.5 0 0 0 2.828 2.47l11.302-6.241ZM2.525 6.425l6.237 3.469-6.877 3.82a1.5 1.5 0 0 1-1.888-1.393V6.425Z"/>
                </svg> */}
                Google Store coming soon...
            </button>
        </p>
      </div>

      <div className="smarter-budgeting-section animate-on-scroll fade-in-up">
        <h2 className="smarter-budgeting-title">Smarter budgeting,<br />built for you</h2>
        <div className="content-wrapper">
          <div className="image-content animate-on-scroll blur-in"></div>
          <div className="budget-card">
            <h3>All your money in<br />one place</h3>
            <p>
              Connect all your banks, cards, and savings accounts.<br />
              Lumeo automatically tracks what's coming in, what's going out, and what's left to spend.
            </p>
          </div>
        </div>
      </div>
      <div className="know-your-money-section animate-on-scroll fade-in">
        <div className="text-container">
          <h3>Should money actually 
be social?
</h3>
          <p>Studies show users exposed to 
          leaderboards saved 57% more.</p>
        </div>
      </div>
      <div className="set-spending-limit-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="image-content spending-limit-image animate-on-scroll blur-in"></div>
          <div className="text-content">
            <h3> Set your location</h3>
            <p>Let Lumeo recommend a local challenge 
based on your income and spending 
habits, or create your own. Lumeo will 
tell you how to maximize your savings 
today.</p>
          </div>
        </div>
      </div>

      <div className="stay-ahead-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
            <div className="text-content">
                <h3>Start your journey</h3>
                <p> See your path to financial freedom in 
just minutes. Lumeo syncs with your 
calendar and schedules daily action to 
ensure you reach your goals and live the 
life you dream of.</p>
            </div>
            <div className="image-content stay-ahead-image animate-on-scroll blur-in"></div>
        </div>
      </div>

      <div className="get-real-answers-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="text-content">
            <h3> Shop your smartest</h3>
            <p>Cut back with personalized product 
recommendation. Whether it's shopping 
deals on your favorite products or going 
to the cheaper store once a month, 
Lumeo spots the deals so you don't 
have to.</p>
          </div>
          <div className="image-content real-answers-image animate-on-scroll blur-in"></div>
        </div>
      </div>

      <div className="challenge-yourself-section animate-on-scroll fade-in-up">
        <div className="content-wrapper">
          <div className="image-content challenge-image animate-on-scroll blur-in"></div>
          <div className="text-content">
            <h3>See your balance grow</h3>
            <p>Earn points every time you save.  
Rack up enough points to start wiping 
out your debt. Pay your debt with the 
points you earn, save the money you 
don't spend, and watch your money 
stack.
</p>
          </div>
        </div>
      </div>

      <div className="final-cta-section animate-on-scroll fade-in visible" style={{position: 'relative', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', padding: 0}}>
        <div
          className="final-cta-bg-image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.95)',
          }}
        ></div>
        <div
          className="final-cta-overlay-box"
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(120,120,120,0.25)',
            borderRadius: '24px',
            padding: '40px 48px',
            maxWidth: '480px',
            marginLeft: '8vw',
            textAlign: 'left',
            boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h2 style={{color: '#fff', fontWeight: 700, fontSize: '2.2rem', marginBottom: '32px', lineHeight: 1.1}}>
            Join the millions of Lumeo subscribers who are
            building a life beyond their next paycheck.
          </h2>
          <button style={{
            background: '#fff',
            color: '#4A2E2E',
            border: 'none',
            borderRadius: '24px',
            padding: '12px 32px',
            fontWeight: 600,
            fontSize: '1.1rem',
            marginTop: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            cursor: 'pointer',
          }}>
            Do the money thing right
          </button>
        </div>
      </div>

      <div className="testimonial-section animate-on-scroll fade-in-up">
        <h2>What our academics are  
        saying<sup>1</sup></h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p className="quote">" 90% are willing to discuss 
their salaries, a stark 
contrast to older generations"</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"58% of Gen Z consult friends/
            family for financial advice."</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"Lumeo is one of the only budget apps that actually worked for me. It helps with income, budgets, bills, and even has a roasting feature. It works extremely well and gives you the reality of your spending."</p>
          </div>
        </div>
      </div>

      <div className="security-section animate-on-scroll fade-in" style={{
        position: 'relative',
        backgroundImage: "linear-gradient(90deg, rgba(247,179,122,0.92) 0%, rgba(247,214,178,0.92) 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <h2>Security and Compliance</h2>
        <div className="security-grid">
          <div className="security-card">
            <div className="security-icon" style={{background: 'rgba(44,28,15,0.13)'}}>
              {/* Bank icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M4 10h16M5 10V8.5A1.5 1.5 0 0 1 6.5 7h11A1.5 1.5 0 0 1 19 8.5V10m-2 4v2m-4-2v2m-4-2v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>Bank-level 256-bit encryption</h3>
            <p>Your bank login details are never stored.<br/><br/>When Cleo needs to connect to your bank, we use Plaid to securely transfer your data using the latest security technology.</p>
          </div>
          <div className="security-card">
            <div className="security-icon" style={{background: 'rgba(44,28,15,0.13)'}}>
              {/* Lock icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M8 11V9a4 4 0 1 1 8 0v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="11" width="12" height="7" rx="2" stroke="#fff" strokeWidth="1.5"/></svg>
            </div>
            <h3>Data protection</h3>
            <p>We never sell your data to third parties. Period.</p>
          </div>
          <div className="security-card">
            <div className="security-icon" style={{background: 'rgba(44,28,15,0.13)'}}>
              {/* Read-only icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="none"/><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="#fff" strokeWidth="1.5"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#fff" strokeWidth="1.5"/></svg>
            </div>
            <h3>Read-only mode</h3>
            <p>Cleo can only view your transaction data in read-only mode. At no time can Cleo access your accounts.</p>
          </div>
        </div>
      </div>

      <FAQ />
    </div>
  );
};

export default Products; 