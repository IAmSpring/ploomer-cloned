"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'

interface PricingFeature {
  name: string
  community: string | boolean
  professional: string | boolean
  teams: string | boolean
  enterprise: string | boolean
}

const pricingFeatures: PricingFeature[] = [
  {
    name: "Maximum number of apps",
    community: "2",
    professional: "10",
    teams: "20",
    enterprise: "Unlimited"
  },
  {
    name: "WASM apps",
    community: "Unlimited",
    professional: "Unlimited",
    teams: "Unlimited",
    enterprise: "Unlimited"
  },
  {
    name: "Monthly CPU hours included",
    community: "372",
    professional: "744",
    teams: "744",
    enterprise: "Custom"
  },
  {
    name: "Monthly memory (GB) hours",
    community: "744",
    professional: "1488",
    teams: "1488",
    enterprise: "Custom"
  },
  {
    name: "On-demand resources",
    community: false,
    professional: "Yes, with pricing",
    teams: "Yes, with pricing",
    enterprise: "Yes, with pricing"
  },
  {
    name: "Authentication",
    community: "No",
    professional: "Password",
    teams: "Password or Google via Auth0",
    enterprise: "SSO, LDAP, or SAML"
  },
  {
    name: "Custom domains",
    community: "No",
    professional: "2",
    teams: "5",
    enterprise: "Custom"
  },
  {
    name: "AI Editor",
    community: "50 daily generations",
    professional: "200 daily generations",
    teams: "500 daily generations",
    enterprise: "Custom"
  }
]

const pricingTiers = [
  {
    name: "Community",
    price: "Free",
    description: "Perfect for getting started and exploring",
    features: [
      "2 apps",
      "Unlimited WASM apps",
      "372 CPU hours/month",
      "744 GB memory hours/month",
      "Slack community support"
    ],
    limitations: [
      "Apps stop after 4h idle",
      "Apps removed after 1w idle",
      "50 AI generations/day",
      "5min deployment rate limit"
    ],
    buttonText: "Get Started",
    buttonLink: "/auth/signup"
  },
  {
    name: "Professional",
    price: "$20",
    period: "per month",
    description: "For individual developers and small teams",
    features: [
      "10 apps",
      "Unlimited WASM apps", 
      "744 CPU hours/month",
      "1488 GB memory hours/month",
      "Password authentication",
      "2 custom domains",
      "200 AI generations/day",
      "No idle limitations",
      "Slack & email support"
    ],
    highlighted: true,
    buttonText: "Start Free Trial",
    buttonLink: "/auth/signup?plan=pro"
  },
  {
    name: "Teams",
    price: "$200",
    period: "per month",
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited everything",
      "Custom AI models",
      "24/7 dedicated support",
      "Unlimited storage",
      "Fastest response time",
      "Custom development",
      "SLA guarantee",
      "On-premise deployment"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact"
  }
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-24 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include our core AI features.
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className={`text-sm ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
          >
            <span className="sr-only">Toggle billing period</span>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annually <span className="text-green-500">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg shadow-lg overflow-hidden ${
                tier.highlighted 
                  ? 'ring-2 ring-[#FFD666] scale-105 bg-white' 
                  : 'bg-white'
              }`}
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-gray-500 ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 mb-6">{tier.description}</p>
                
                <a
                  href={tier.buttonLink}
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    tier.highlighted
                      ? 'bg-[#FFD666] hover:bg-[#FFC933] text-black'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {tier.buttonText}
                </a>
              </div>
              
              <div className="px-8 pb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Features
                </h4>
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Can I switch plans later?
            </h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-600">
              Yes, we offer a 30-day money-back guarantee for all paid plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 