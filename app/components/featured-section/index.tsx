"use client"

import Image from "next/image"
import { FEATURED_LOGOS } from "@/lib/constants"

export function FeaturedSection() {
  return (
    <section className="py-16 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">
          Featured At
          <span className="block w-12 h-1 bg-primary-600 mx-auto mt-4"></span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {Object.entries(FEATURED_LOGOS).map(([name, src]) => (
            <Image
              key={name}
              src={src}
              alt={`${name} logo`}
              width={120}
              height={40}
              className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  )
} 