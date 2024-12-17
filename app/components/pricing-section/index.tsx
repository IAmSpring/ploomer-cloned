"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface PricingTier {
  title: string
  price: string
  priceSubtext?: string
  features: string[]
  ctaText: string
  ctaLink: string
}

const PRICING_TIERS: PricingTier[] = [
  {
    title: "Community",
    price: "Free",
    features: [
      "2 apps",
      "Unlimited WASM apps",
      "AI Editor (rate limited)",
      "0.5 vCPU / 1 GiB memory monthly",
      "Slack support"
    ],
    ctaText: "Sign up for free",
    ctaLink: "https://www.platform.ploomber.io"
  },
  {
    title: "Professional",
    price: "$20",
    priceSubtext: "per month",
    features: [
      "10 apps",
      "Unlimited WASM apps",
      "AI Editor",
      "1 vCPU / 2 GiB memory monthly",
      "Slack support",
      "App authentication",
      "Custom domains"
    ],
    ctaText: "Start a 10-day trial",
    ctaLink: "https://www.platform.ploomber.io/register/?trial=pro"
  },
  {
    title: "Teams",
    price: "$200",
    priceSubtext: "per month",
    features: [
      "20 apps",
      "Unlimited WASM apps",
      "AI Editor",
      "1 vCPU / 2 GiB memory monthly",
      "Slack (private) and email support",
      "Auth0 integration",
      "Custom domains",
      "Analytics",
      "Static IPs",
      "IP whitelisting"
    ],
    ctaText: "Start a 10-day trial",
    ctaLink: "https://www.platform.ploomber.io/register/?trial=teams"
  },
  {
    title: "Enterprise",
    price: "Custom pricing",
    features: [
      "Unlimited apps",
      "Unlimited WASM apps",
      "AI Editor",
      "Custom compute pricing",
      "Slack (private), email, and phone support",
      "SSO, LDAP, or SAML authentication",
      "Cloud, VPC, or on-premise deployment"
    ],
    ctaText: "Schedule a demo!",
    ctaLink: "https://calendly.com/edubr/ploomber-customer-support"
  }
]

export function PricingSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">{tier.title}</h2>
                
                <div className="mb-6 text-center">
                  {tier.priceSubtext && (
                    <span className="text-sm text-gray-500">Starting at</span>
                  )}
                  <div className="text-3xl font-bold">{tier.price}</div>
                  {tier.priceSubtext && (
                    <span className="text-sm text-gray-500">{tier.priceSubtext}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaLink}
                  className="bg-[#FFD666] text-black px-6 py-2 rounded-md hover:bg-[#FFD666]/90 transition-colors text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tier.ctaText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 