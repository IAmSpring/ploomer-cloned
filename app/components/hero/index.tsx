"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const [currentText, setCurrentText] = useState("Panel apps")
  const texts = ["Panel apps", "Streamlit apps", "Dash apps", "Shiny apps"]
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length)
      setCurrentText(texts[textIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [textIndex])

  return (
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Deploy enterprise
            <br />
            <span id="changing-text" className="text-[#FFD666] transition-all">
              {currentText}
            </span>
          </h1>
          
          <Link 
            href="/auth/signin"
            className="inline-block bg-[#FFD666] text-black px-8 py-4 rounded-md text-lg font-medium hover:bg-[#FFD666]/90 transition-colors"
          >
            Deploy your app now
          </Link>

          <div className="mt-16">
            <p className="text-lg text-gray-600 flex items-center justify-center gap-3">
              Backed by
              <Image
                src="/images/ycombinator.svg"
                alt="Y Combinator"
                width={120}
                height={30}
                className="inline-block"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 