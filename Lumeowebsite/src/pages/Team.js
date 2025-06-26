import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Team.css';

const teamMembers = [
  {
    name: 'Jake Lenef',
    linkedin: '#',
    description: 'Serial Entrepreneur who went from over $22K in debt to $40K+ assets in a year. Built Lumeo to turn financial',
    logoClass: 'logo-boston-university',
    nameClass: 'member-name-jake',
  
  },
  {
    name: 'Eric Bell',
    linkedin: '#',
    description: 'AI expert translating financial',
    logoClass: 'logo-mit',
    nameClass: 'member-name-eric',
    
  },
];

const getImageClass = (name) => {
  if (name.toLowerCase().includes('jake')) return 'jake-lenef';
  if (name.toLowerCase().includes('eric')) return 'eric-bell';
  return '';
};

const Team = () => {
  useScrollAnimation();

  return (
    <div className="team-page">
      <div className="team-header animate-on-scroll fade-in">
        <h1 className="team-title">The team</h1>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member-card animate-on-scroll fade-in-up" key={index}>
            <div className={`member-image-placeholder ${getImageClass(member.name)}`}></div>
            <div className="member-info">
              
              <h3 className={member.nameClass}>{member.name}</h3>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-favicon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" fill="#0077B5"/>
                </svg>
              </a>
              <p className="member-description">{member.description}</p>
              <div className="member-logos">
                <div className={member.logoClass}></div>
              </div>
          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; 