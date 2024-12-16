export const uiHelpers = {
  highlight: (selector: string) => {
    const element = document.querySelector(selector)
    if (element) {
      // Add highlight overlay
      const overlay = document.createElement('div')
      overlay.className = 'absolute inset-0 bg-[#FFD666] opacity-20 pointer-events-none z-10 transition-all duration-500'
      element.classList.add('relative')
      element.appendChild(overlay)

      // Remove after animation
      setTimeout(() => {
        overlay.remove()
      }, 2000)
    }
  },

  scrollTo: (selector: string) => {
    const element = document.querySelector(selector)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  },

  fillInput: (selector: string, value: string) => {
    const input = document.querySelector(selector) as HTMLInputElement
    if (input) {
      input.value = value
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }
  },

  clickButton: (selector: string) => {
    const button = document.querySelector(selector) as HTMLButtonElement
    if (button) {
      button.click()
    }
  }
} 