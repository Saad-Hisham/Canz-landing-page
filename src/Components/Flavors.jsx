import React, { useLayoutEffect } from 'react'
import orangeFlavor from '../assets/flavor-orange.png'
import berryFlavor from '../assets/flavor-berry.png'
import lemonFlavor from '../assets/flavor-lemon.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Flavors = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from('.flavors h2', {
        scrollTrigger: {
          trigger: '.flavors h2',
          start: 'top 90%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      // Animate flavor items
      gsap.from('.flavor-item', {
        scrollTrigger: {
          trigger: '.flavor-list',
          start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out'
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id='flavors' className='flavors'>
        <h2>Discover Our Flavors</h2>
        <div className='flavor-list'>
            <div className='flavor-item mango'>
                <div className="flavor-card-inner">
                    <div className="flavor-card-front">
                        <img src={orangeFlavor} alt='Tropical Mango' />
                        <h3>Orange</h3>
                    </div>
                    <div className="flavor-card-back">
                        <h3>Orange</h3>
                        <p>Experience the sun-kissed sweetness of ripe oranges in every sip. Pure refreshment, naturally energized.</p>
                    </div>
                </div>
            </div>

            <div className='flavor-item berry'>
                <div className="flavor-card-inner">
                    <div className="flavor-card-front">
                        <img src={berryFlavor} alt='Berry Blast' />
                        <h3>Berry Blast</h3>
                    </div>
                    <div className="flavor-card-back">
                        <h3>Berry Blast</h3>
                        <p>A vibrant explosion of mountain berries. Sweet, tangy, and packed with antioxidants to keep you going.</p>
                    </div>
                </div>
            </div>

            <div className='flavor-item classic'>
                <div className="flavor-card-inner">
                    <div className="flavor-card-front">
                        <img src={lemonFlavor} alt='Classic' />
                        <h3>Lemon</h3>
                    </div>
                    <div className="flavor-card-back">
                        <h3>Lemon</h3>
                        <p>The timeless zest of fresh lemons. Crisp, clean, and perfectly balanced for an instant mood lift.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Flavors
