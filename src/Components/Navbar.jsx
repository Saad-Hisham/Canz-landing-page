import React, { useState, useEffect, useLayoutEffect } from 'react'
import logo from '../assets/logo.png'
import { gsap } from 'gsap'

const Navbar = ({ flavor, lenis }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  const getFlavorStyles = () => {
    switch (flavor) {
      case 'orange': return { filter: 'hue-rotate(0deg)', accent: '#f57c00' };
      case 'lemon': return { filter: 'hue-rotate(90deg)', accent: 'rgb(53 253 89)' };
      case 'berries': return { filter: 'hue-rotate(280deg)', accent: '#7b1fa2' };
      default: return { filter: 'none', accent: '#333' };
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Make navbar fixed after scrolling 100px
      if (window.scrollY > 100) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId) => {
    setIsOpen(false)
    const element = document.getElementById(sectionId)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: 0, duration: 1.2 })
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { filter, accent } = getFlavorStyles()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.2 }
      })

      tl.from('.nav-logo', {
        y: -50,
        opacity: 0,
        delay: 0.5
      })
      .from('.nav-links li', {
        y: -30,
        opacity: 0,
        stagger: 0.1
      }, '-=0.8')
    })

    return () => ctx.revert()
  }, [])

  return (
    <nav className={`navbar ${isFixed ? 'navbar-fixed' : ''}`} style={{ '--accent-color': accent }}>
      <img className="nav-logo" src={logo} alt='Logo' style={{ filter, transition: 'filter 0.35s ease' }} />
      
      <div className={`burger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href='#hero' onClick={(e) => { e.preventDefault(); handleNavClick('hero') }}>Home</a></li>
        <li><a href='#flavors' onClick={(e) => { e.preventDefault(); handleNavClick('flavors') }}>Flavor</a></li>
        <li><a href='#benefits' onClick={(e) => { e.preventDefault(); handleNavClick('benefits') }}>Benefits</a></li>
        <li><a href='#contact' onClick={(e) => { e.preventDefault(); handleNavClick('contact') }}>Contact</a></li>
        <li><button className="nav-btn">get yours</button></li>
      </ul>
    </nav>
  )
}

export default Navbar
