import React, { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import orangeFlavor from '../assets/flavor-orange.png'
import berryFlavor from '../assets/flavor-berry.png'
import lemonFlavor from '../assets/flavor-lemon.png'
import canImg from '../assets/can.png'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 85%',
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out(1.7)'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id='gallery' className='gallery'>
      <h2>Moments with ZenFlow</h2>
      <div className='gallery-grid'>
        <div className='gallery-item'><img src={orangeFlavor} alt='Gallery 1' /></div>
        <div className='gallery-item'><img src={canImg} alt='Gallery 2' /></div>
        <div className='gallery-item'><img src={berryFlavor} alt='Gallery 3' /></div>
        <div className='gallery-item'><img src={lemonFlavor} alt='Gallery 4' /></div>
        <div className='gallery-item'><img src={orangeFlavor} alt='Gallery 5' /></div>
        <div className='gallery-item'><img src={berryFlavor} alt='Gallery 6' /></div>
      </div>
    </section>
  )
}

export default Gallery
