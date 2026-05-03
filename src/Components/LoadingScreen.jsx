import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
  return (
    <Box
      className={`loading-screen ${!isLoading ? 'loading-fade-out' : ''}`}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fff',
        zIndex: 9999,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {/* Spinner */}
        <Box
          sx={{
            width: 60,
            height: 60,
            border: '4px solid #f0f0f0',
            borderTop: '4px solid #f57c00',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              to: { transform: 'rotate(360deg)' }
            }
          }}
        />
        
        {/* Loading text */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="h2"
            sx={{
              m: 0,
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#333',
              letterSpacing: '2px',
              fontFamily: 'Pacifico, cursive',
            }}
          >
            CANZ
          </Box>
          <Box
            sx={{
              fontSize: '0.9rem',
              color: '#999',
              marginTop: '0.5rem',
              letterSpacing: '1px',
            }}
          >
            Loading...
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
