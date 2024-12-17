import { PricingSection } from "@/app/components/pricing-section"
import { PricingComparison } from "@/app/components/pricing-comparison"

export default function PricingPage() {
  return (
    <main>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-gray-600 text-center mb-12">Choose the plan that's right for you</p>
      </div>
      <PricingSection />
      <PricingComparison />
    </main>
  )
} 