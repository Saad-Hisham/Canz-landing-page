import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Model as Can } from '../Can'
import { gsap } from 'gsap'
import orangeImage from '../assets/orange.png'
import orangeSliceImage from '../assets/orange_slice.png'
import lemonImage from '../assets/lemon.png'
import lemonSliceImage from '../assets/lemon-slice.png'
import berryImage from '../assets/berry.png'
import backgroundOrange from '../assets/background-orange.png'
import backgroundLemon from '../assets/background-lemon.jpg'
import backgroundBerry from '../assets/background-berry.jpg'
import layer1Orange from '../assets/layer1-orange.png'
import layer2Orange from '../assets/layer-2.png'
import layer1Lemon from '../assets/layer1-lemon.png'
import layer2Lemon from '../assets/layer2-lemon.png'
import layer1Berry from '../assets/layer1-berry.png'
import layer2Berry from '../assets/layer2-berry.png'

const tasteConfig = {
    orange: {
        label: 'Orange',
        background: backgroundOrange,
        canTexture: 'orange',
        fruitImage: orangeImage,
        sliceImage: orangeSliceImage,
        layer1: layer1Orange,
        layer2: layer2Orange,
        accent: '#f57c00',
        textColor: '#333333',

    },
    lemon: {
        label: 'Lemon',
        background: backgroundLemon,
        canTexture: 'lemon',
        fruitImage: lemonImage,
        sliceImage: lemonSliceImage,
        layer1: layer1Lemon,
        layer2: layer2Lemon,
        accent: 'rgb(53 253 89)',
        textColor: '#333333',
    },
    berries: {
        label: 'Berries',
        background: backgroundBerry,
        canTexture: 'berries',
        fruitImage: berryImage,
        sliceImage: berryImage,
        layer1: layer1Berry,
        layer2: layer2Berry,
        accent: '#7b1fa2',
        textColor: '333333',
    },
}

/** Scale from width and height so short laptop viewports (e.g. 1366×768) do not clip the can. */
const getResponsiveScale = (width, height) => {
    const safeW = Math.max(width ?? 800, 320)
    const safeH = Math.max(height ?? 700, 400)

    let wPart
    if (safeW < 480) {
        wPart = Math.max(0.3*2, safeW / 1700)
    } else if (safeW < 600) {
        wPart = Math.max(0.36*2, safeW / 1650)
    } else if (safeW < 900) {
        wPart = Math.max(0.4*2, safeW / 1750)
    } else if (safeW < 1200) {
        wPart = Math.max(0.44*2, safeW / 1850)
    } else if (safeW < 1536) {
        wPart = Math.max(0.48, safeW / 1780)
    } else {
        wPart = Math.min(0.86, safeW / 1620)
    }

    const hPart =
        safeH < 600
            ? Math.max(0.26, safeH / 1250)
            : safeH < 720
                ? Math.max(0.32, safeH / 1180)
                : safeH < 820
                    ? Math.max(0.38, safeH / 1120)
                    : safeH < 960
                        ? Math.max(0.44, safeH / 1080)
                        : Math.max(0.52, Math.min(1, safeH / 980))

    return Math.min(wPart, hPart)
}

/** Lower the can slightly on short screens so the label stays in frame. */
const getResponsiveYPosition = (height) => {
    const h = height ?? 800
    if (h < 540) return 0.1
    if (h < 640) return 0.16
    if (h < 760) return 0.22
    if (h < 860) return 0.28
    if (h < 960) return 0.34
    return 0.4
}

const SPIN_RADIANS = Math.PI * 2
const IDLE_ROTATION_SEC = 10

/** Full 360° rotations per flavor spin (720° total = one “extra” turn after the first). */
const FLAVOR_SPIN_FULL_TURNS = 2
/** When total spin is FLAVOR_SPIN_FULL_TURNS × 360°, swap texture after one full turn (π rad) → progress 1 / (2×turns). */
const getFlavorTextureSwapProgress = () => 1 / (2 * FLAVOR_SPIN_FULL_TURNS)

/** Same orientation, keeps numbers small for the GPU without a visible jump. */
const wrapYRotation = (y) => ((y % SPIN_RADIANS) + SPIN_RADIANS) % SPIN_RADIANS

const RotatingCan = ({ scale, textureKey, spinSeq, onSpinMidpoint, onSpinComplete }) => {
    const ref = useRef()
    const idleTween = useRef(null)

    const startIdle = useCallback(() => {
        if (!ref.current) return
        idleTween.current?.kill()
        idleTween.current = gsap.to(ref.current.rotation, {
            y: `+=${SPIN_RADIANS}`,
            duration: IDLE_ROTATION_SEC,
            repeat: -1,
            ease: 'none',
        })
    }, [])

    useLayoutEffect(() => {
        startIdle()
        return () => idleTween.current?.kill()
    }, [startIdle])

    useEffect(() => {
        if (!spinSeq || !ref.current) return

        idleTween.current?.kill()

        const group = ref.current
        const startY = group.rotation.y
        const totalRadians = SPIN_RADIANS * FLAVOR_SPIN_FULL_TURNS
        const endY = startY + totalRadians
        const swapAt = getFlavorTextureSwapProgress()
        let midpointCalled = false

        const tween = gsap.to(group.rotation, {
            y: endY,
            duration: 0.95,
            ease: 'power3.inOut',
            onUpdate() {
                if (!midpointCalled && this.progress() >= swapAt) {
                    midpointCalled = true
                    onSpinMidpoint?.()
                }
            },
            onComplete: () => {
                group.rotation.y = wrapYRotation(endY)
                startIdle()
                onSpinComplete?.()
            },
        })

        return () => tween.kill()
    }, [spinSeq, onSpinMidpoint, onSpinComplete, startIdle])

    return (
        <group ref={ref}>
            <Can scale={scale} textureKey={textureKey} position={[0, 0, 0]} />
        </group>
    )
}

const collectAssetUrls = () => {
    const urls = new Set()
    Object.values(tasteConfig).forEach((t) => {
        ;[t.background, t.layer1, t.layer2, t.fruitImage, t.sliceImage].forEach((u) => {
            if (u) urls.add(u)
        })
    })
    return [...urls]
}

const Hero = ({ flavor, setFlavor }) => {
    const [sceneFlavor, setSceneFlavor] = useState('orange')
    const [spinSeq, setSpinSeq] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [heroAssetsReady, setHeroAssetsReady] = useState(false)
    const [scale, setScale] = useState(() =>
        getResponsiveScale(window.innerWidth, window.innerHeight),
    )
    const [yPosition, setYPosition] = useState(() => getResponsiveYPosition(window.innerHeight))
    const sliceRef = useRef(null)
    const current = tasteConfig[sceneFlavor]
    const selected = tasteConfig[flavor]

    useEffect(() => {
        const urls = collectAssetUrls()
        let cancelled = false
        Promise.all(
            urls.map(
                (src) =>
                    new Promise((resolve) => {
                        const img = new Image()
                        img.onload = () => resolve()
                        img.onerror = () => resolve()
                        img.src = src
                    }),
            ),
        ).then(() => {
            if (!cancelled) setHeroAssetsReady(true)
        })
        return () => {
            cancelled = true
        }
    }, [])

    useLayoutEffect(() => {
        if (!heroAssetsReady) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power4.out', duration: 1.5 },
            })

            tl.from('.hero-title', {
                y: 80,
                opacity: 0,
                skewY: 7,
                stagger: 0.1,
            })
                .from(
                    '.hero-subtitle',
                    {
                        y: 40,
                        opacity: 0,
                        duration: 1.2,
                    },
                    '-=1.2',
                )
                .from(
                    '.hero-flavor-label, .hero-flavor-buttons button, .hero-flavor-buttons-mobile',
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 1,
                    },
                    '-=1',
                )
                .from(
                    '.hero-fruit-left',
                    {
                        x: -150,
                        opacity: 0,
                        rotation: -45,
                        scale: 0.5,
                        duration: 1.8,
                        ease: 'back.out(1.7)',
                    },
                    '-=1.5',
                )
                .from(
                    '.hero-fruit-right',
                    {
                        x: 150,
                        opacity: 0,
                        rotation: 45,
                        scale: 0.5,
                        duration: 1.8,
                        ease: 'back.out(1.7)',
                    },
                    '-=1.6',
                )
                .from(
                    '.layer-1',
                    {
                        scale: 1.3,
                        opacity: 0,
                        duration: 2,
                    },
                    '-=2',
                )
                .from(
                    '.layer-2',
                    {
                        scale: 1.1,
                        opacity: 0,
                        duration: 2,
                    },
                    '-=1.8',
                )
                .from(
                    'canvas',
                    {
                        scale: 0.8,
                        opacity: 0,
                        duration: 2,
                    },
                    '-=2',
                )
        })

        return () => ctx.revert()
    }, [heroAssetsReady])

    const handleSpinMidpoint = useCallback(() => {
        setSceneFlavor(flavor)
        // Update CSS variables for global theme
        const config = tasteConfig[flavor]
        document.documentElement.style.setProperty('--accent-color', config.accent)
        document.documentElement.style.setProperty('--text-color', config.textColor)
    }, [flavor])

    const handleSpinComplete = useCallback(() => {
        setIsTransitioning(false)
    }, [])

    const handleTasteChange = (key) => {
        if (isTransitioning) return
        if (key === sceneFlavor) return
        setFlavor(key)
        setIsTransitioning(true)
        setSpinSeq((n) => n + 1)
    }

    useEffect(() => {
        const handleResize = () => {
            setScale(getResponsiveScale(window.innerWidth, window.innerHeight))
            setYPosition(getResponsiveYPosition(window.innerHeight))
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!sliceRef.current) return

        const tween = gsap.to(sliceRef.current, {
            y: -18,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })

        return () => tween.kill()
    }, [sceneFlavor])

    return (
        <div
            id="hero"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            <Grid
                container
                spacing={{ xs: 1.5, lg: 2 }}
                sx={{
                    minHeight: { xs: 'auto', lg: '100svh' },
                    maxHeight: { lg: '100svh' },
                    backgroundImage: `url(${current.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    alignItems: 'stretch',
                    width: '100%',
                    maxWidth: '100%',
                    margin: 0,
                }}
            >
                <Grid
                    size={{ xs: 12, md: 4, lg: 4 }}
                    className="text-container"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', md: 'flex-start', lg: 'flex-start' },
                        py: { xs: 2, sm: 2.5, md: 2, lg: 3 },
                        px: { xs: 1, sm: 2, md: 1.5 },
                        maxHeight: { md: '100svh', lg: '100svh' },
                        overflowY: 'hidden',
                        overflow: 'visible',
                        minWidth: 0,
                    }}
                >
                    <div className="container">
                        <h1 className="hero-title" style={{ color: current.accent, transition: 'color 0.35s ease' }}>
                            feel the freshness
                        </h1>
                        <p className="hero-subtitle" style={{ color: current.textColor, transition: 'color 0.35s ease' }}>
                            Delicious. Fizzy. Fun.
                        </p>
                        <Typography
                            component="p"
                            variant="overline"
                            className="hero-flavor-label"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                letterSpacing: '0.12em',
                                mt: 2.5,
                                mb: 0.5,
                                color: 'rgba(0,0,0,0.55)',
                                fontWeight: 700,
                            }}
                        >
                            Flavors
                        </Typography>
                        <Box
                            className="hero-flavor-buttons"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: { md: 0.5, lg: 0.75 },
                                mt: { md: 1.5, lg: 2 },
                                width: '100%',
                                maxWidth: '100%',
                                minWidth: 0,
                            }}
                        >
                            {Object.entries(tasteConfig).map(([key, option]) => (
                                <Button
                                    key={key}
                                    variant={flavor === key ? 'contained' : 'outlined'}
                                    disabled={isTransitioning}
                                    onClick={() => handleTasteChange(key)}
                                    sx={{
                                        borderRadius: '2rem',
                                        minHeight: { md: 36, lg: 40 },
                                        px: { md: 1, lg: 1.5 },
                                        py: { md: 0.5, lg: 0.75 },
                                        flex: '1 1 auto',
                                        minWidth: 0,
                                        fontSize: { md: '0.7rem', lg: '0.8rem' },
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        color: flavor === key ? option.textColor : selected.accent,
                                        backgroundColor:
                                            flavor === key ? option.accent : 'transparent',
                                        borderColor: selected.accent,
                                        '&:hover': {
                                            backgroundColor:
                                                flavor === key ? option.accent : `${selected.accent}22`,
                                        },
                                    }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </Box>
                    </div>
                </Grid>
                <Grid
                    size={{ xs: 12, md: 8, lg: 8 }}
                    sx={{
                        position: 'relative',
                        minHeight: { xs: 'min(58vh, 520px)', sm: 'min(62vh, 600px)', md: 'min(64vh, 620px)', lg: '100svh' },
                        height: { md: 'auto', lg: '100svh' },
                        maxHeight: { md: 'none', lg: '100svh' },
                        minWidth: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            className='layer-1'
                            style={{ backgroundImage: current.layer1 ? `url(${current.layer1})` : 'none' }}
                        ></div>
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                            {current.sliceImage && (
                                <img
                                    key={current.sliceImage}
                                    ref={sliceRef}
                                    src={current.sliceImage}
                                    alt={`${current.label} slice`}
                                    className="hero-fruit-right"
                                    style={{
                                        position: 'absolute',
                                        right: 'clamp(4%, 12vw, 15%)',
                                        top: 'clamp(4%, 8vh, 12%)',
                                        transform: 'translateX(-50%) rotate(-25deg)',
                                        width: 'clamp(72px, min(16vw, 12vh), 200px)',
                                        maxWidth: '22%',
                                        zIndex: 2,
                                    }}
                                />
                            )}
                            <img
                                src={current.fruitImage}
                                alt={current.label}
                                className="hero-fruit-left"
                                style={{
                                    position: 'absolute',
                                    left: 'clamp(4%, 12vw, 15%)',
                                    bottom: 'clamp(38%, 42vh, 52%)',
                                    transform: 'translateX(-50%) rotate(-25deg) skewY(-10deg)',
                                    width: 'clamp(72px, min(16vw, 12vh), 200px)',
                                    maxWidth: '22%',
                                    zIndex: 2,
                                }}
                            />
                        </div>
                        <Canvas
                            dpr={[1, 2]}
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                background: 'transparent',
                                opacity: heroAssetsReady ? 1 : 0,
                            }}
                            gl={{ alpha: true, antialias: true }}
                        >
                            <ambientLight intensity={0.85} />
                            <directionalLight position={[5, 6, 5]} intensity={1.05} />
                            <group position={[0, yPosition, 0]}>
                                <RotatingCan
                                    scale={scale}
                                    textureKey={current.canTexture}
                                    spinSeq={spinSeq}
                                    onSpinMidpoint={handleSpinMidpoint}
                                    onSpinComplete={handleSpinComplete}
                                />
                            </group>
                            <Environment preset="city" />
                        </Canvas>
                        <div
                            className='layer-2'
                            style={{ backgroundImage: current.layer2 ? `url(${current.layer2})` : 'none' }}
                        ></div>
                    </Box>
                </Grid>
                <Grid
                    size={{ xs: 12 }}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 0,
                        px: { xs: 1, sm: 2 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0.75,
                            width: '100%',
                            maxWidth: '100%',
                        }}
                    >
                        <Typography
                            component="p"
                            variant="overline"
                            className="hero-flavor-label"
                            sx={{
                                display: 'block',
                                width: '100%',
                                letterSpacing: '0.12em',
                                mb: 0.25,
                                color: 'rgba(0,0,0,0.55)',
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            Flavors
                        </Typography>
                        {Object.entries(tasteConfig).map(([key, option]) => (
                            <Button
                                key={key}
                                className="hero-flavor-buttons-mobile"
                                variant={flavor === key ? 'contained' : 'outlined'}
                                disabled={isTransitioning}
                                onClick={() => handleTasteChange(key)}
                                sx={{
                                    borderRadius: '2rem',
                                    minHeight: 44,
                                    px: 1.5,
                                    py: 0.75,
                                    flex: '1 1 auto',
                                    minWidth: '0',
                                    fontSize: '0.8rem',
                                    color: flavor === key ? option.textColor : selected.accent,
                                    backgroundColor:
                                        flavor === key ? option.accent : 'transparent',
                                    borderColor: selected.accent,
                                    '&:hover': {
                                        backgroundColor:
                                            flavor === key ? option.accent : `${selected.accent}22`,
                                    },
                                }}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Hero
