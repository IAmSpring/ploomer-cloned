"use client"

import Link from "next/link"
import { FEATURES } from "@/lib/constants"

export function EnterpriseFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Enterprise Features</h2>
          <p className="text-gray-600">
            Enhance your applications with our powerful enterprise-grade features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="https://calendly.com/edubr/ploomber-customer-support"
            className="btn btn-primary"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  )
} 