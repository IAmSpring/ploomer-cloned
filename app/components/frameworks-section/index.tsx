"use client"

import Image from "next/image"
import Link from "next/link"
import { FRAMEWORK_LOGOS } from "@/lib/constants"

export function FrameworksSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-5/12">
            <h2 className="text-3xl font-semibold mb-4">
              Build with any framework
            </h2>
            <p className="text-gray-600 mb-8">
              We support all major frameworks. Or use Docker for maximum flexibility.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.platform.ploomber.io/register"
                className="bg-[#FFD666] text-black px-6 py-2 rounded-md hover:bg-[#FFD666]/90 transition-colors"
              >
                Get started
              </Link>
              <Link
                href="https://docs.cloud.ploomber.io/en/latest/quickstart/app.html"
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Read more
              </Link>
            </div>
          </div>

          {/* Framework Image */}
          <div className="lg:w-6/12">
            <Image
              src={FRAMEWORK_LOGOS.frameworks}
              alt="Supported Frameworks"
              width={575}
              height={276}
              className="w-[90%] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 