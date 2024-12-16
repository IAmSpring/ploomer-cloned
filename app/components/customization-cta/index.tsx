"use client"

import Link from "next/link"

export function CustomizationCTA() {
  return (
    <section className="py-12 text-center border-t border-b">
      <div className="container mx-auto px-4">
        <h3 className="text-xl font-semibold mb-4">
          Looking for more customization?
        </h3>
        <p className="text-gray-600 mb-6">
          Our enterprise customers enjoy advanced features and differentiated support to meet their specific needs.
        </p>
        <Link 
          href="https://calendly.com/edubr/ploomber-customer-support"
          className="btn btn-primary"
        >
          Contact Sales
        </Link>
      </div>
    </section>
  )
} 