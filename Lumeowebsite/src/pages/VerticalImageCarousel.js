import React, { useState, useRef, useEffect } from 'react';
import './VerticalImageCarousel.css';

const slides = [
  {
    image: '/images/slide1.jpg',
    caption: 'First Slide Caption',
    description: 'This is the first slide description.',
  },
  {
    image: '/images/slide2.jpg',
    caption: 'Second Slide Caption',
    description: 'This is the second slide description.',
  },
  {
    image: '/images/slide3.jpg',
    caption: 'Third Slide Caption',
    description: 'This is the third slide description.',
  },
];

const VerticalImageCarousel = () => {
  const [active, setActive] = useState(0);
  const isScrolling = useRef(false);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      if (e.deltaY > 0 && active < slides.length - 1) {
        setActive((prev) => Math.min(prev + 1, slides.length - 1));
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 800);
      } else if (e.deltaY < 0 && active > 0) {
        setActive((prev) => Math.max(prev - 1, 0));
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 800);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [active]);

  return (
    <div className="vertical-carousel">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`carousel-slide${active === idx ? ' active' : ''}`}
          style={{
            transform: `translateY(${(idx - active) * 100}vh)`,
            zIndex: slides.length - idx,
          }}
        >
          <img src={slide.image} alt="" className="carousel-image" />
          <div className={`carousel-caption${active === idx ? ' animate' : ''}`}>
            <h2>{slide.caption}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
      <ul className="carousel-dots">
        {slides.map((_, idx) => (
          <li
            key={idx}
            className={active === idx ? 'active' : ''}
            onClick={() => setActive(idx)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalImageCarousel; 