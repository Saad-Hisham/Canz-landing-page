import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/logo.png'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: '.about',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id='about' className='about'>
      <div className='container'>
        <div className='about-grid'>
          <div className='about-image'>
            <img src={logo} alt='About ZenFlow' />
          </div>
          <div className='about-content'>
            <h2>About ZenFlow</h2>
            <p>ZenFlow was born from a simple idea: that energy should be clean, sustainable, and mindful. We believe in providing a boost that doesn't just wake you up, but keeps you focused and balanced.</p>
            <p>Our unique blend of natural ingredients ensures a steady flow of energy without the crash. Whether you're working, studying, or exploring, ZenFlow is your perfect companion.</p>
            <div className='about-stats'>
              <div className='stat-item'>
                <h4>100%</h4>
                <p>Natural</p>
              </div>
              <div className='stat-item'>
                <h4>0%</h4>
                <p>Sugar</p>
              </div>
              <div className='stat-item'>
                <h4>24/7</h4>
                <p>Energy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
