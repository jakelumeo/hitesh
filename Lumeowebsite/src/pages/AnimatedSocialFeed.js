import React, { useEffect, useState, useRef } from 'react';
import './AnimatedSocialFeed.css';

const initialPosts = [
  {
    id: 1,
    user: 'Elynn Lee 🏆',
    handle: '@ElynnLeeSaves',
    time: '2d',
    text: 'OMG! GUYS WHOLE FOODS HAS CHICKEN ON SALE!!! GET IT NOW!! I SAVED $18!!! #FREECOFFEE4THEWEEK',
    likes: 16,
    comments: 14,
    reshares: 8,
  },
  {
    id: 2,
    user: 'lunavoyager',
    handle: '@LunaSaves',
    time: '40m',
    text: 'BUY ONE GET ONE FREE CELSIUS ENERGY AT CVS RN 😳😳 #W40thSt',
    likes: 16,
    comments: 14,
    reshares: 8,
  },
  {
    id: 3,
    user: 'nebulanomad',
    handle: '@NebuSaves',
    time: '40m',
    text: 'OMG! GUYS WHOLE FOODS HAS CHICKEN ON SALE!!! GET IT NOW!! I SAVED $18!!! #FREECOFFEE4THEWEEK',
    likes: 16,
    comments: 14,
    reshares: 8,
  },
];

const demoNewPosts = [
  {
    id: 4,
    user: 'nebulanomad',
    handle: '@NebuSaves',
    time: 'Just now',
    text: 'OMG! GUYS WHOLE FOODS HAS CHICKEN ON SALE!!! GET IT NOW!! I SAVED $18!!! #FREECOFFEE4THEWEEK',
    likes: 16,
    comments: 14,
    reshares: 8,
  },
  {
    id: 5,
    user: 'lunavoyager',
    handle: '@LunaSaves',
    time: 'Just now',
    text: 'BUY ONE GET ONE FREE CELSIUS ENERGY AT CVS RN 😳😳 #W40thSt',
    likes: 16,
    comments: 14,
    reshares: 8,
  },
];

const AnimatedSocialFeed = ({ className = '' }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostIndex, setNewPostIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef();
  const ANIMATION_INTERVAL = 4000;
  const ANIMATION_DURATION = 300;
  const FEED_LENGTH = initialPosts.length;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        // Insert the new post at the top, remove the last
        setPosts((prev) => [
          demoNewPosts[newPostIndex],
          ...prev.slice(0, FEED_LENGTH - 1)
        ]);
        setAnimating(false);
        setNewPostIndex((i) => (i + 1) % demoNewPosts.length);
      }, ANIMATION_DURATION);
    }, ANIMATION_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [posts, newPostIndex]);

  return (
    <div className={`social-feed-mockup ${className}`}>
      <div className="feed-header">
        <div className="feed-tabs">
          <span className="tab">Following</span>
          <span className="tab active">For you</span>
          <span className="tab">Favorites</span>
        </div>
        <div className="feed-title">Posts</div>
      </div>
      <div className="feed-posts">
        {posts.map((post, idx) => (
          <div
            key={post.id + '-' + idx}
            className={`feed-post${animating && idx === 0 ? ' slide-in' : ''}`}
            style={{ willChange: animating && idx === 0 ? 'transform' : 'auto' }}
          >
            <div className="post-header">
              <span className="post-user">{post.user}</span>
              <span className="post-handle">{post.handle}</span>
              <span className="post-time">· {post.time}</span>
            </div>
            <div className="post-text">{post.text}</div>
            <div className="post-actions">
              <span className="action-btn likes">Likes {post.likes}</span>
              <span className="action-btn comments">Comments {post.comments}</span>
              <span className="action-btn reshares">Reshares {post.reshares}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="feed-navbar">
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

export default AnimatedSocialFeed; 