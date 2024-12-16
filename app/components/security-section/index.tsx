"use client"

import Link from "next/link"
import Image from "next/image"

export function SecuritySection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Secure Your Apps</h2>
            <p className="text-gray-600 mb-8">
              Add enterprise-grade authentication with one click. No need to modify your source code.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.platform.ploomber.io/register"
                className="btn btn-primary"
              >
                Get Started
              </Link>
              <Link 
                href="https://docs.cloud.ploomber.io"
                className="btn border border-gray-300 hover:bg-gray-50"
              >
                Read Docs
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Image
              src="/images/features/auth-demo.png"
              alt="Login interface screenshot"
              width={500}
              height={400}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 