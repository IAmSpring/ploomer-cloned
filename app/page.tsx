import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { BrandsCarousel } from "@/components/brands-carousel"
import { SecuritySection } from "@/components/security-section"
import { DomainSection } from "@/components/domain-section"
import { FrameworksSection } from "@/components/frameworks-section"
import { EnterpriseFeatures } from "@/components/enterprise-features"
import { CustomizationCTA } from "@/components/customization-cta"
import { Testimonials } from "@/components/testimonials"
import { FeaturedSection } from "@/components/featured-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <Hero />
      <BrandsCarousel />
      <SecuritySection />
      <DomainSection />
      <FrameworksSection />
      <EnterpriseFeatures />
      <CustomizationCTA />
      <Testimonials />
      <FeaturedSection />
      <Footer />
    </main>
  )
} 