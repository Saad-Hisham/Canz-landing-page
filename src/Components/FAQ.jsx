import React, { useState } from 'react'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "Is Canz sugar-free?",
      answer: "Yes! All our flavors are 100% sugar-free and keto-friendly."
    },
    {
      question: "Where can I buy Canz?",
      answer: "You can find us in most major retailers and right here on our website!"
    },
    {
      question: "What is the caffeine content?",
      answer: "Each can contains 150mg of natural caffeine derived from green tea extract."
    },
    {
      question: "Is it suitable for vegans?",
      answer: "Absolutely! Canz is 100% vegan and gluten-free."
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id='faq' className='faq'>
      <div className='container'>
        <h2>Frequently Asked Questions</h2>
        <div className='faq-list'>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className='faq-question'>
                <h3>{faq.question}</h3>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className='faq-answer'>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
