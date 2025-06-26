import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Product2.css';

const featuresData = [
  { name: 'AI Accountant', lumeo: true, ynab: false, rocket: true, copilot: true },
  { name: 'Geo-Savings', lumeo: true, ynab: false, rocket: false, copilot: false },
  { name: 'Gamification', lumeo: true, ynab: false, rocket: false, copilot: false },
  { name: 'Social', lumeo: true, ynab: false, rocket: false, copilot: false },
  { name: 'Personalized', lumeo: true, ynab: false, rocket: false, copilot: false },
  { name: 'Exclusive Perks', lumeo: true, ynab: false, rocket: false, copilot: false },
];

const Product2 = () => {
  useScrollAnimation();

  return (
    <div className="features-page animate-on-scroll fade-in">
      <div className="features-header">
        <h1 className="features-title">Features</h1>
      </div>
      <div className="features-table-container">
        <table className="features-table">
          <thead>
            <tr>
              <th></th>
              <th>Lumeo</th>
              <th>YNAB</th>
              <th>Rocket Money</th>
              <th>Copilot</th>
            </tr>
          </thead>
          <tbody>
            {featuresData.map((feature, index) => (
              <tr key={index}>
                <td>{feature.name}</td>
                <td><span className={feature.lumeo ? 'check' : 'cross'}>{feature.lumeo ? '✓' : '✗'}</span></td>
                <td><span className={feature.ynab ? 'check' : 'cross'}>{feature.ynab ? '✓' : '✗'}</span></td>
                <td><span className={feature.rocket ? 'check' : 'cross'}>{feature.rocket ? '✓' : '✗'}</span></td>
                <td><span className={feature.copilot ? 'check' : 'cross'}>{feature.copilot ? '✓' : '✗'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product2; 