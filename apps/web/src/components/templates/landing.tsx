"use client"

import { HeroSplit } from "@/components/blocks/hero-split"
import { LogoCloud } from "@/components/blocks/logo-cloud"
import { FeatureAlternating } from "@/components/blocks/feature-alternating"
import { StatsSection } from "@/components/blocks/stats"
import { TestimonialsSection } from "@/components/blocks/testimonials"
import { PricingSection } from "@/components/blocks/pricing"
import { FaqSection } from "@/components/blocks/faq"
import { CtaSection } from "@/components/blocks/cta-section"
import { Footer } from "@/components/blocks/footer"

export function LandingTemplate() {
  return (
    <>
      <HeroSplit />
      <LogoCloud />
      <FeatureAlternating />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  )
}

export default LandingTemplate
