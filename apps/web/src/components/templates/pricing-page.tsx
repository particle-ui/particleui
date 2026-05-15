"use client"

import { HeroCentered } from "@/components/blocks/hero-centered"
import { PricingSection } from "@/components/blocks/pricing"
import { FaqSection } from "@/components/blocks/faq"
import { CtaSection } from "@/components/blocks/cta-section"
import { Footer } from "@/components/blocks/footer"

export function PricingPageTemplate() {
  return (
    <>
      <HeroCentered
        badge="Simple pricing"
        headlinePre="Pricing that"
        headlineGradient="scales with you."
        headlinePost=""
        subwords={["Free forever.", "No credit card.", "Cancel anytime.", "MIT license."]}
        description="Start free and upgrade only when you need more. Every plan includes all core components."
        primaryCta="View plans below"
        primaryHref="#pricing"
        secondaryCta="Talk to sales"
        secondaryHref="/contact"
        meteors={true}
      />
      <PricingSection />
      <FaqSection
        heading="Pricing questions"
        description="Everything you need to know about our plans and billing."
      />
      <CtaSection
        heading="Ready to get started?"
        headingGradient="It's free."
        description="Join thousands of developers already building with ParticleUI."
        primaryCta="Start for free"
        primaryHref="/docs/getting-started/installation"
      />
      <Footer />
    </>
  )
}

export default PricingPageTemplate
