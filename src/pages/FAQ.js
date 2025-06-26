import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
      question: "How does Lumeo work?",
      answer: "Lumeo tracks your spending, boosts your savings, and turns your money moves into real progress. Think AI coach meets financial glow-up."
    },
    {
      question: "What's the best AI money app right now?",
      answer: "You're looking at it. Lumeo's built for real life—not spreadsheets. No judgment, just smart tools that actually help."
    },
    {
      question: "Can Lumeo help me stick to a budget?",
      answer: "Absolutely. Lumeo learns your habits, finds where you're overspending, and keeps you on track—with just the right amount of attitude."
    },
    {
      question: "How accurate is Lumeo's AI?",
      answer: "Very. Lumeo doesn't guess. It uses real-time data to deliver personal finance journeys that adapt as fast as your lifestyle does."
    },
    {
        question: "Why is Lumeo the best app for beginners?",
        answer: "No jargon. No lectures. Just simple, swipeable insights and goals that make sense—even if you've never budgeted a day in your life."
    },
    {
        question: "How much can I save in a month?",
        answer: "Most users save hundreds in their first 30 days. And yes—you'll actually feel it."
    },
    {
        question: "How much does it cost?",
        answer: "Free to start. Premium tools when you're ready to level up. No surprises, no hidden fees—ever."
    }
  ];

const FAQItem = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={`faq ${faq.open ? 'open' : ''}`}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        {faq.question}
        <span className="faq-icon">{faq.open ? '-' : '+'}</span>
      </div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
};

const FAQ = () => {
    const [faqList, setFaqList] = useState(
      faqs.map(faq => ({ ...faq, open: false }))
    );
  
    const toggleFAQ = index => {
      setFaqList(
        faqList.map((faq, i) => {
          if (i === index) {
            return { ...faq, open: !faq.open };
          }
          return faq;
        })
      );
    };
  
    return (
      <div className="faq-section animate-on-scroll fade-in-up visible">
        <h2>FAQ</h2>
        <p>Still have questions? Find answers below.</p>
        <div className="faqs">
          {faqList.map((faq, index) => (
            <FAQItem faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
          ))}
        </div>
      </div>
    );
  };
  
  export default FAQ; 