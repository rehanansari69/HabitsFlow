import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardHero from './components/DashboardHero';
import SpecSheetBento from './components/SpecSheetBento';
import SocialProofMetrics from './components/SocialProofMetrics';
import EarlyAccessForm from './components/EarlyAccessForm';
import StickyCTA from './components/StickyCTA';

export default function StreakPage() {
  return (
    <main className="relative bg-[#0D0D0D]">
      {/* Scanline effect */}
      <div className="scanline" />

      {/* Navigation */}
      <Header />

      {/* Hero — Live Dashboard Preview */}
      <DashboardHero />

      {/* Spec Sheet Bento Grid */}
      <SpecSheetBento />

      {/* Social Proof + System Metrics */}
      <SocialProofMetrics />

      {/* Early Access Form */}
      <EarlyAccessForm />

      {/* Footer */}
      <Footer />

      {/* Sticky CTA bar */}
      <StickyCTA />
    </main>
  );
}