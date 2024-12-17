"use client"

import { useState } from 'react'
import Link from 'next/link'

type TierType = 'community' | 'professional' | 'teams' | 'enterprise'

interface TierTooltips {
  [key: string]: string
}

interface PricingValues {
  community: string
  professional: string
  teams: string
  enterprise: string
  tooltip?: string | TierTooltips
}

interface PricingFeature {
  name: string
  tooltip?: string
  docLink?: string
  values: PricingValues
}

const PRICING_FEATURES: PricingFeature[] = [
  {
    name: "Maximum number of apps",
    values: {
      community: "2",
      professional: "10",
      teams: "20",
      enterprise: "Unlimited",
      tooltip: "You can deploy up to {value} apps (compute is counted separately)."
    }
  },
  {
    name: "WASM apps",
    docLink: "https://docs.cloud.ploomber.io/en/latest/user-guide/wasm.html",
    values: {
      community: "Unlimited",
      professional: "Unlimited",
      teams: "Unlimited",
      enterprise: "Unlimited",
      tooltip: "WASM apps run entirely in the browser; they don't count towards your app or compute quota."
    }
  },
  {
    name: "Monthly CPU hours included",
    values: {
      community: "372",
      professional: "744",
      teams: "744",
      enterprise: "Custom",
      tooltip: {
        community: "You can keep 1 app running with 0.5 CPU 24/7 every month. Or two apps with 0.5 CPU each for 12 hours per day every month.",
        professional: "You can keep 1 app running with 1 CPU 24/7 every month. Or two apps with 1 CPU each for 12 hours per day every month.",
        teams: "You can keep 1 app running with 1 CPU 24/7 every month. Or two apps with 1 CPU each for 12 hours per day every month."
      }
    }
  },
  // ... add all other features from the table
]

export function PricingComparison() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const tiers: TierType[] = ['community', 'professional', 'teams', 'enterprise']

  const getTooltipContent = (feature: PricingFeature, tier: TierType) => {
    const { tooltip } = feature.values
    if (!tooltip) return null
    
    if (typeof tooltip === 'string') {
      return tooltip.replace('{value}', feature.values[tier])
    }
    
    return tooltip[tier] || null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4"></th>
              <th className="text-left p-4">Community</th>
              <th className="text-left p-4">Professional</th>
              <th className="text-left p-4">Teams</th>
              <th className="text-left p-4">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {PRICING_FEATURES.map((feature) => (
              <tr key={feature.name} className="border-b hover:bg-gray-50">
                <th className="text-left p-4 font-medium">{feature.name}</th>
                {tiers.map((tier) => (
                  <td 
                    key={tier}
                    className="p-4 relative group"
                    onMouseEnter={() => setActiveTooltip(`${feature.name}-${tier}`)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {feature.docLink ? (
                      <Link 
                        href={feature.docLink}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                      >
                        {feature.values[tier]}
                      </Link>
                    ) : (
                      <span>{feature.values[tier]}</span>
                    )}
                    
                    {/* Tooltip */}
                    {activeTooltip === `${feature.name}-${tier}` && feature.values.tooltip && (
                      <div className="absolute z-10 bg-black text-white text-sm rounded-lg p-2 w-48 -mt-1 left-full ml-2">
                        {getTooltipContent(feature, tier)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
} 