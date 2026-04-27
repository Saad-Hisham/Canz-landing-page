import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const flavorConfig = {
  orange: {
    primary: '#f57c00',
    light: '#ff9f43',
    shadow: 'rgba(245, 124, 0, 0.3)'
  },
  lemon: {
    primary: 'rgb(53, 253, 89)',
    light: 'rgb(100, 255, 130)',
    shadow: 'rgba(53, 253, 89, 0.3)'
  },
  berries: {
    primary: '#7b1fa2',
    light: '#a855f7',
    shadow: 'rgba(123, 31, 162, 0.3)'
  }
};

const ScrollProgress = ({ flavor = 'orange' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const config = flavorConfig[flavor] || flavorConfig.orange;

  useEffect(() => {
    let animationFrameId = null;

    const updateScrollProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = window.scrollY;
      const totalScroll = (scrollTop / windowHeight) * 100;
      setScrollProgress(totalScroll);
      
      // Continuously update on every frame
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    // Start the continuous update loop
    animationFrameId = requestAnimationFrame(updateScrollProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '10px',
        background: `linear-gradient(90deg, ${config.primary}, ${config.light})`,
        width: `${scrollProgress}%`,
        zIndex: 9999,
        transition: 'width 0s ease-out, background 0.35s ease',
        boxShadow: `0 2px 8px ${config.shadow}`,
      }}
    />
  );
};

export default ScrollProgress;

