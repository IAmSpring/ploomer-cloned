import { Hero } from "@/app/components/hero"
import { BrandsCarousel } from "@/app/components/brands-carousel"
import { SecuritySection } from "@/app/components/security-section"
import { DomainSection } from "@/app/components/domain-section"
import { FrameworksSection } from "@/app/components/frameworks-section"
import { EnterpriseFeatures } from "@/app/components/enterprise-features"
import { CustomizationCTA } from "@/app/components/customization-cta"
import { Testimonials } from "@/app/components/testimonials"
import { FeaturedSection } from "@/app/components/featured-section"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <BrandsCarousel />
      <SecuritySection />
      <DomainSection />
      <FrameworksSection />
      <EnterpriseFeatures />
      <CustomizationCTA />
      <Testimonials />
      <FeaturedSection />
    </main>
  )
} 