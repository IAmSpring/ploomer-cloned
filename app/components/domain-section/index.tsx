"use client"

import Link from "next/link"
import Image from "next/image"

export function DomainSection() {
  return (
    <section className="py-20 border-b">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-[#1E1E1E] rounded-lg p-4">
            <Image
              src="/images/features-domain.png"
              alt="Domain configuration interface"
              width={500}
              height={300}
              className="rounded border border-gray-700"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Bring Your Domain</h2>
            <p className="text-gray-600 mb-6">
              Serve your apps from a custom domain!{" "}
              <span className="text-[#FFD666]">company.com</span> or subdomain{" "}
              <span className="text-[#FFD666]">app.company.com</span>
            </p>
            <div className="flex gap-4">
              <Link 
                href="/register"
                className="btn btn-primary"
              >
                Get Started
              </Link>
              <Link 
                href="/docs"
                className="btn border border-gray-300 hover:bg-gray-50"
              >
                Read Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 