import HeroSection from './landing/HeroSection';
import TrustSection from './landing/TrustSection';
import HowItWorksSection from './landing/HowItWorksSection';
import FeaturesSection from './landing/FeaturesSection';
import LiveBuilderSection from './landing/LiveBuilderSection';
import TemplatesSection from './landing/TemplatesSection';
import ATSCheckerSection from './landing/ATSCheckerSection';
import TestimonialsSection from './landing/TestimonialsSection';
import PricingSection from './landing/PricingSection';
import FAQSection from './landing/FAQSection';
import FooterSection from './landing/FooterSection';

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <FeaturesSection />
      <LiveBuilderSection />
      <TemplatesSection />
      <ATSCheckerSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
