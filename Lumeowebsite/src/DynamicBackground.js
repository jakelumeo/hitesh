import { useEffect } from 'react';

const DynamicBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.body.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(253, 158, 0, 0.1) 0%, rgba(255, 244, 224, 0.8) 50%, #FFF4E0 100%)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Set initial background
    document.body.style.background = 'radial-gradient(circle at 50% 50%, rgba(253, 158, 0, 0.1) 0%, rgba(255, 244, 224, 0.8) 50%, #FFF4E0 100%)';
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.background = '';
    };
  }, []);
  return null;
};

export default DynamicBackground; 