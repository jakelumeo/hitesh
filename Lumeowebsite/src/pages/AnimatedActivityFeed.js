import React, { useEffect, useState, useRef } from 'react';
import './AnimatedActivityFeed.css';

const demoActivities = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    user: 'starryskies23',
    time: '1d',
    action: 'Started following you',
    follow: true,
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    user: 'nebulanomad',
    time: '1d',
    action: 'Liked your post',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48',
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    user: 'emberecho',
    time: '2d',
    action: 'Liked your comment',
    comment: 'Happy Shopping!!!',
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    user: 'lunavoyager',
    time: '3d',
    action: 'Saved your post',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48',
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    user: 'shadowlynx',
    time: '4d',
    action: 'Commented on your post',
    comment: ",i'm going on black Friday. what about you?!",
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48',
  },
  {
    id: 6,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    user: 'nebulanomad',
    time: '5d',
    action: 'Shared a post you might like',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=facearea&w=48&h=48',
  },
  {
    id: 7,
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    user: 'lunavoyager',
    time: '5d',
    action: 'Liked your comment',
    comment: 'This is so pricey!!! 🏷️💰',
  },
];

const FEED_LENGTH = 6;
const ANIMATION_INTERVAL = 2500;
const ANIMATION_DURATION = 500;

const AnimatedActivityFeed = ({ className = '' }) => {
  const [activities, setActivities] = useState(demoActivities.slice(0, FEED_LENGTH));
  const [nextIndex, setNextIndex] = useState(FEED_LENGTH);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setActivities((prev) => [
          demoActivities[nextIndex % demoActivities.length],
          ...prev.slice(0, FEED_LENGTH - 1)
        ]);
        setAnimating(false);
        setNextIndex((i) => (i + 1) % demoActivities.length);
      }, ANIMATION_DURATION);
    }, ANIMATION_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [activities, nextIndex]);

  return (
    <div className={`activity-feed-mockup ${className}`}>
      <div className="activity-header">Activity</div>
      <div className="activity-list">
        {activities.map((item, idx) => (
          <div
            key={item.id + '-' + idx}
            className={`activity-item${animating && idx === 0 ? ' activity-slide-in' : ''}`}
          >
            <div className="activity-avatar">
              <img src={item.avatar} alt={item.user} />
              <span className="activity-dot" />
            </div>
            <div className="activity-info">
              <div className="activity-user-row">
                <span className="activity-user">{item.user}</span>
                <span className="activity-time">{item.time}</span>
                {item.follow && <button className="activity-follow">Follow</button>}
              </div>
              <div className="activity-action">{item.action}</div>
              {item.comment && <div className="activity-comment">{item.comment}</div>}
            </div>
            {item.image && (
              <div className="activity-image">
                <img src={item.image} alt="activity" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="activity-navbar">
        <span className="nav-icon home" />
        <span className="nav-icon search" />
        <span className="nav-icon sun" />
        <span className="nav-icon bell">
          <span className="notif-dot">5</span>
        </span>
        <span className="nav-icon user" />
      </div>
    </div>
  );
};

export default AnimatedActivityFeed; 