import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './Components/Hero'
import Navbar from './Components/Navbar'
import Flavors from './Components/Flavors'
import Benfits from './Components/benfits'
import About from './Components/About'
import Gallery from './Components/Gallery'
import FAQ from './Components/FAQ'
import Contact from './Components/contact'
import LoadingScreen from './Components/LoadingScreen'
import ScrollProgress from './Components/ScrollProgress'

function App() {
  const [flavor, setFlavor] = useState('orange')
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    // Simulate asset loading and wait for images to load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Also check when actual page resources are loaded
    const handleLoad = () => {
      setIsLoading(false)
    }

    window.addEventListener('load', handleLoad)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <ScrollProgress flavor={flavor} />
      <LoadingScreen isLoading={isLoading} />
      <Navbar flavor={flavor} lenis={lenisRef.current} />
      <Hero flavor={flavor} setFlavor={setFlavor} />
      <Flavors />
      <Benfits flavor={flavor} />
      <FAQ />
      <Contact flavor={flavor} />
    </>
  )
}

export default App
