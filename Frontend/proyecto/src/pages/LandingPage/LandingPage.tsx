import React from 'react';
import { PublicNavbar } from '../../components/layout/PublicNavbar/PublicNavbar';
import { Footer } from '../../components/layout/Footer/Footer';
import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { CTASection } from './sections/CTASection';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingLayout}>
      <PublicNavbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};
