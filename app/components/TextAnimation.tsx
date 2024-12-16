'use client'

import { useEffect } from 'react'

export default function TextAnimation() {
  useEffect(() => {
    const texts = ["Panel apps", "Streamlit apps", "Dash apps", "Shiny apps"]
    let currentIndex = 0
    const changingText = document.getElementById('changing-text')

    const changeText = () => {
      if (changingText) {
        changingText.style.opacity = '0'
        
        setTimeout(() => {
          changingText.textContent = texts[currentIndex]
          changingText.style.opacity = '1'
          currentIndex = (currentIndex + 1) % texts.length
        }, 500)
      }
    }

    const interval = setInterval(changeText, 3000)
    return () => clearInterval(interval)
  }, [])

  return null
} 