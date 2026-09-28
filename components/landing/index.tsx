"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { PipelineSection } from "./PipelineSection";
import { InfrastructureSection } from "./InfrastructureSection";
import { PillarsSection } from "./PillarsSection";
import { ImpactSection } from "./ImpactSection";
import { FaqSection } from "./FaqSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { AosProvider } from "./AosProvider";
import { PlatformSelectModal, AuthMode } from "./PlatformSelectModal";

export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleOpenAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AosProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar onOpenAuthModal={handleOpenAuthModal} />
        <main className="flex-1">
          <HeroSection onOpenAuthModal={handleOpenAuthModal} />
          <PipelineSection />
          <InfrastructureSection />
          <PillarsSection />
          <ImpactSection />
          <FaqSection />
          <ContactSection />
        </main>
        <Footer />

        {/* Global Platform Selection Modal */}
        <PlatformSelectModal
          isOpen={authModalOpen}
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </AosProvider>
  );
}
