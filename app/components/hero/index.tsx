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
    <section className="banner">
      <div className="container relative z-10">
        <div className="text-center">
          <h1 className="max-w-4xl mx-auto mb-8">
            Deploy enterprise<br/>
            <span id="changing-text" className="text-primary-600">
              {currentText}
            </span>
          </h1>
          <div className="flex justify-center gap-4">
            <Link 
              href="/auth/signin"
              className="btn btn-primary"
            >
              Deploy your app now
            </Link>
          </div>
          <div className="mt-12">
            <p className="text-lg text-gray-600">
              Backed by 
              <Image
                src="/images/ycombinator.png"
                alt="YCombinator"
                width={100}
                height={30}
                className="inline-block ml-2"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 