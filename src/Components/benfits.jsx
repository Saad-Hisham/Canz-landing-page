import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import caffeineIcon from '../assets/cofee.png';
import orangeIcon from '../assets/orange.png';
import lemonIcon from '../assets/lemon.png';
import berryIcon from '../assets/berry.png';
import sugarIcon from '../assets/no-sugar.png';
import energy from '../assets/energy.png';

const flavorConfig = {
    orange: {
        accent: '#f57c00',
        icon: orangeIcon
    },
    lemon: {
        accent: 'rgb(53 253 89)',
        icon: lemonIcon
    },
    berries: {
        accent: '#7b1fa2',
        icon: berryIcon
    }
};

const Benefits = ({ flavor }) => {
    const config = flavorConfig[flavor] || flavorConfig.orange;
    const headingRef = useRef(null);
    const containerRef = useRef(null);
    const benefitsRef = useRef([]);

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

        // Animate benefit cards with stagger
        gsap.fromTo(
            benefitsRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
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

    const getFlavorStyles = () => {
        switch (flavor) {
            case 'orange': return { filter: 'hue-rotate(0deg)' };
            case 'lemon': return { filter: 'hue-rotate(90deg)' };
            case 'berries': return { filter: 'hue-rotate(280deg)' };
            default: return { filter: 'hue-rotate(0deg)' };
        }
    }

    const { filter } = getFlavorStyles();

    const benefitsData = [
        {
            title: 'Energy Boost',
            description: 'Increase your energy & focus',
            icon: (
                <img src={energy} style={{ maxWidth: "4rem", filter, transition: 'filter 0.35s ease' }} alt="energy" />
            ),
        },
        {
            title: 'Zero Sugar',
            description: 'Guilt-free refreshment',
            icon: (
                <img src={sugarIcon} style={{ maxWidth: "4rem", filter, transition: 'filter 0.35s ease' }} alt="no-sugar" />
            ),
        },
        {
            title: 'Great Taste',
            description: 'Delicious & refreshing',
            icon: (
                <img src={config.icon} style={{ maxWidth: "4rem" }} alt="flavor" />
            ),
        },
        {
            title: 'Natural Caffeine',
            description: 'Powered by natural caffeine',
            icon: (
                <img src={caffeineIcon} style={{ maxWidth: "4rem" }} alt="caffeine" />
            ),
        },
    ];

    return (
        <Box id='benefits' ref={containerRef} sx={{ py: 8, bgcolor: '#fff' }} style={{ marginTop: '80px' }}>
            <Container maxWidth="lg">
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
                        Why Choose CANZ?
                    </Typography>
                    <Box sx={{ height: '1px', bgcolor: '#e0e0e0', flex: 1, maxWidth: 100 }} />
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    }}
                >
                    <Grid container spacing={4} justifyContent="center">
                        {benefitsData.map((benefit, index) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                md={3} 
                                key={index}
                                ref={(el) => benefitsRef.current[index] = el}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {benefit.icon}
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#333' }}>
                                            {benefit.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.2 }}>
                                            {benefit.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Benefits;
