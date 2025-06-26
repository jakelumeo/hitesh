import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      if (elementsToAnimate.length > 0) {
        elementsToAnimate.forEach((el) => {
          if (el) { // Ensure element exists before unobserving
            observer.unobserve(el);
          }
        });
      }
    };
  }, []);
};

export default useScrollAnimation; 