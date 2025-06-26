import React from 'react';
import './TheStory.css';
import founderImg from './founder.png';

const TheStory = () => {
  return (
    <div className="the-story-template-container">
      <div className="the-story-horizontal-row">
        <div className="the-story-horizontal-left">
          <img src={founderImg} alt="Founder" className="the-story-photo" />
          <div className="the-story-founder-info">
            <span className="the-story-founder-name">Jake Lenef</span>
            <a className="the-story-linkedin" href="https://www.linkedin.com/in/jakewlenef//" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle', marginLeft: '8px'}}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z"/></svg>
            </a>
            <div className="the-story-founder-title">Founder</div>
          </div>
        </div>
        <div className="the-story-horizontal-right">
          <div className="the-story-horizontal-content">
            <h2 className="the-story-title">Meet Our Founder</h2>
            <p className="the-story-body">
              This is Jake. Just a year ago, Jake was over $20,000 in debt. He wasn't buying Ferraris. He just made the mistake everyone makes when they get their first Amex. Flights to Vegas. Clubs in Miami. Late nights in New York. Expensive drinks, overpriced dinners, "it's only money" energy.
            </p>
            <p className="the-story-body">
              Jake wasn't stupid. He just thought he was gonna be rich tomorrow—so what was the problem with spending like it today? The problem? Reality doesn't care about vibes. Rent hit. Bills stacked up. And that "I'll pay it off next month" mindset turned into minimum payments and maxed-out cards.
            </p>
            <h2 className="the-story-title">The Failed Solutions</h2>
            <p className="the-story-body">
              He tried to fix it. Budgeting apps? Confusing. Spreadsheets? Exhausting. Financial advice? Preachy. He'd say "I need to stop spending," and then reward himself for saying it… by buying something. Classic.
            </p>
            <h2 className="the-story-title">The Turning Point</h2>
            <p className="the-story-body">
              Then it got real. First, his mom found out. She saw the debt. Didn't yell. Just shook her head. And said the words no child wants to hear: <em>"I thought I raised you better."</em>
            </p>
            <p className="the-story-body">
              That was the moment. Jake promised himself he would turn it all around. Make mom proud.
            </p>
            <h2 className="the-story-title">The Revelation</h2>
            <p className="the-story-body">
              Then, the real gut-punch: He asked his friends what their net worth was. Some lied. Some joked. But most were in the exact same mess. Pretending to be rich. Drowning in debt. No plan. No savings. No clue.
            </p>
            <blockquote className="the-story-quote">
              "Nobody talks about money, but everybody's worried about it."
            </blockquote>
            <h2 className="the-story-title">The Quest Solution</h2>
            <p className="the-story-body">
              So Jake built something different: Not a budgeting app. Not a spreadsheet. Not another boring tool you download, ignore, then delete.
            </p>
            <p className="the-story-body">
              Lumeo is a social finance platform built for people who hustle hard, flex smart, and are done being broke. It's money meets leaderboard. It's net worth meets dopamine. It's saving, growing, winning—and showing your friends how it's done.
            </p>
            <blockquote className="the-story-quote">
              "If we can compete on Instagram likes, gym gains, and Wordle streaks… why not compete on building real wealth?"
            </blockquote>
            <h2 className="the-story-title">The Transformation</h2>
            <p className="the-story-body">
              Now this is Jake. He's still got the AirPod in his right ear. Still grinding. Still working insane hours. But the difference? Jake's not broke anymore. His credit score's climbing. His savings are stacking. His mom's bragging. And that Amex? Paid in full.
            </p>
            <p className="the-story-body">
              Want to know how he did it? Lumeo. He got honest. He got help. And then he built the tool we all wish existed.
            </p>
            <p className="the-story-body" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '30px'}}>
              Welcome to Lumeo. Track it. Save it. Flex it. Win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheStory;