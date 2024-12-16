"use client"

import Image from "next/image"
import Link from "next/link"
import { FRAMEWORK_LOGOS } from "@/lib/constants"

export function FrameworksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Build With Any Framework
          </h2>
          <p className="text-gray-600 text-center mb-12">
            We support all major frameworks. Or use Docker for maximum flexibility.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.entries(FRAMEWORK_LOGOS).map(([name, src]) => (
            <div key={name} className="flex items-center justify-center p-4">
              <Image
                src={src}
                alt={`${name} logo`}
                width={80}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Link 
            href="https://www.platform.ploomber.io/register"
            className="btn btn-primary"
          >
            Deploy Now
          </Link>
          <Link 
            href="https://docs.cloud.ploomber.io"
            className="btn border border-gray-300 hover:bg-gray-50"
          >
            Read Docs
          </Link>
        </div>
      </div>
    </section>
  )
} 