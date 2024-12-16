"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

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
    description: "For growing teams that need more",
    features: [
      "20 apps",
      "Auth0 integration",
      "5 custom domains",
      "500 AI generations/day",
      "Static IPs",
      "IP whitelisting",
      "Application analytics",
      "Private Slack channel",
      "Support SLA"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited apps",
      "Custom compute resources",
      "SSO/LDAP/SAML auth",
      "VPC or on-premise deployment",
      "Custom domain limit",
      "Phone support",
      "Custom AI limits",
      "Dedicated support team"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact/enterprise"
  }
]

// Dynamically import AIChat with no SSR since it uses browser APIs
const AIChat = dynamic(
  () => import('@/app/components/AIChat'),
  { ssr: false }
)

export default function PricingPage() {
  const [view, setView] = useState<'cards' | 'comparison'>('cards')
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-24 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include core features and WASM support.
        </p>
        
        {/* View Toggle */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setView('cards')}
            className={`px-4 py-2 rounded-lg ${
              view === 'cards' 
                ? 'bg-[#FFD666] text-black' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Simple View
          </button>
          <button
            onClick={() => setView('comparison')}
            className={`px-4 py-2 rounded-lg ${
              view === 'comparison' 
                ? 'bg-[#FFD666] text-black' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Compare Features
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
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

      {view === 'cards' ? (
        // Pricing Cards View
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                {/* Card content */}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // Comparison Table View
        <div className="max-w-7xl mx-auto px-4 pb-24 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">Feature</th>
                {['Community', 'Professional', 'Teams', 'Enterprise'].map(plan => (
                  <th key={plan} className="text-left py-4 px-6">{plan}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingFeatures.map((feature, index) => (
                <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-4 px-6 font-medium">{feature.name}</td>
                  <td className="py-4 px-6">{feature.community}</td>
                  <td className="py-4 px-6">{feature.professional}</td>
                  <td className="py-4 px-6">{feature.teams}</td>
                  <td className="py-4 px-6">{feature.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add AI Chat component */}
      <AIChat />
    </div>
  )
} 