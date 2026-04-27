import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, TextField, Button, Container, IconButton } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const flavorConfig = {
  orange: {
    accent: '#f57c00',
    light: 'rgba(245, 124, 0, 0.05)',
    medium: 'rgba(245, 124, 0, 0.1)',
    shadow: 'rgba(245, 124, 0, 0.4)',
    hover: '#e57c00'
  },
  lemon: {
    accent: 'rgb(53 253 89)',
    light: 'rgba(53, 253, 89, 0.05)',
    medium: 'rgba(53, 253, 89, 0.1)',
    shadow: 'rgba(53, 253, 89, 0.4)',
    hover: 'rgb(43 223 79)'
  },
  berries: {
    accent: '#7b1fa2',
    light: 'rgba(123, 31, 162, 0.05)',
    medium: 'rgba(123, 31, 162, 0.1)',
    shadow: 'rgba(123, 31, 162, 0.4)',
    hover: '#6a1b9a'
  }
};

const Contact = ({ flavor }) => {
  const config = flavorConfig[flavor] || flavorConfig.orange;
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          markers: false
        }
      }
    );

    // Animate form from left
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: false,
          markers: false
        }
      }
    );

    // Animate info box from right
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: false,
          markers: false
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box id='contact' ref={containerRef} sx={{ 
      py: 8, 
      bgcolor: '#fff', 
      position: 'relative', 
      overflow: 'hidden',
      background: `linear-gradient(180deg, #ffffff 0%, ${config.light} 100%)`,
      transition: 'background 0.35s ease'
    }}>
      {/* Background decoration */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        height: '30%', 
        background: `linear-gradient(135deg, ${config.light} 0%, ${config.medium} 100%)`,
        clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)',
        zIndex: 0,
        transition: 'background 0.35s ease'
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <Box ref={headingRef} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6, gap: 2 }}>
          <Box sx={{ height: '1px', bgcolor: '#e0e0e0', flex: 1, maxWidth: 100 }} />
          <Typography
            variant="h2"
            sx={{
              color: config.accent,
              fontFamily: 'Pacifico, cursive',
              fontSize: { xs: '2rem', md: '2.5rem' },
              textAlign: 'center',
              transition: 'color 0.35s ease'
            }}
          >
            Get In Touch
          </Typography>
          <Box sx={{ height: '1px', bgcolor: '#e0e0e0', flex: 1, maxWidth: 100 }} />
        </Box>

        <Grid container spacing={6}>
          {/* Form Side */}
          <Grid item xs={12} md={6} ref={formRef}>
            <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
              Have questions? We'd love to hear from you!
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                placeholder="Your Name"
                variant="outlined"
                sx={{ 
                  bgcolor: '#f9f9f9',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#eee' },
                    '&.Mui-focused fieldset': { borderColor: config.accent }
                  }
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                placeholder="Your Email"
                variant="outlined"
                sx={{ 
                  bgcolor: '#f9f9f9',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#eee' },
                    '&.Mui-focused fieldset': { borderColor: config.accent }
                  }
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                multiline
                rows={4}
                placeholder="Your Message"
                variant="outlined"
                sx={{ 
                  bgcolor: '#f9f9f9',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#eee' },
                    '&.Mui-focused fieldset': { borderColor: config.accent }
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  bgcolor: config.accent,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.35s ease',
                  '&:hover': { bgcolor: config.hover },
                  boxShadow: `0 4px 14px ${config.shadow}`
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Contact Info Side */}
          <Grid item xs={12} md={6} ref={infoRef}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 4 ,background: 'white', p: 2, borderRadius: 3}}>
              {/* Email Box */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Box sx={{ color: config.accent, transition: 'color 0.35s ease', mt: 0.5, flexShrink: 0 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#999', fontWeight: 500, mb: 1 }}>Email:</Typography>
                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem' }}>info@canzenergy.com</Typography>
                </Box>
              </Box>

              {/* Phone Box */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Box sx={{ color: config.accent, transition: 'color 0.35s ease', mt: 0.5, flexShrink: 0 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#999', fontWeight: 500, mb: 1 }}>Phone:</Typography>
                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem' }}>+123 456 7890</Typography>
                </Box>
              </Box>

              {/* Social Icons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {[
                  { name: 'facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                  { name: 'instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
                  { name: 'twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' }
                ].map((social) => (
                  <IconButton key={social.name} sx={{ 
                    bgcolor: config.accent, 
                    color: '#fff',
                    transition: 'all 0.35s ease',
                    '&:hover': { bgcolor: config.hover }
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {social.name === 'instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>}
                      <path d={social.path}></path>
                    </svg>
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
