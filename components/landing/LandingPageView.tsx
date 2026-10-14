"use client";

import React, { useState } from "react";
import { WhiteNavbar } from "./WhiteNavbar";
import { MainHeroSection } from "./MainHeroSection";
import { PartnerStripSection } from "./PartnerStripSection";
import { PopularCoursesSection } from "./PopularCoursesSection";
import { AssessmentPlatformSection } from "./AssessmentPlatformSection";
import { JobPortalSection } from "./JobPortalSection";
import { SocialImpactSection } from "./SocialImpactSection";
import { FaqAccordionSection } from "./FaqAccordionSection";
import { WorkforceCtaBanner } from "./WorkforceCtaBanner";
import { DarkFooter } from "./DarkFooter";
import { PlatformSelectModal, AuthMode } from "./PlatformSelectModal";
import { AosProvider } from "./AosProvider";

export function LandingPageView() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleOpenAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AosProvider>
      <div className="min-h-screen flex flex-col bg-white select-text">
        <WhiteNavbar onOpenAuthModal={handleOpenAuthModal} />

      <main className="flex-1">
        <MainHeroSection onOpenAuthModal={handleOpenAuthModal} />
        <PartnerStripSection />
        <PopularCoursesSection />
        <AssessmentPlatformSection />
        <JobPortalSection />
        <SocialImpactSection />
        <FaqAccordionSection />
        <WorkforceCtaBanner onOpenAuthModal={handleOpenAuthModal} />
      </main>
      <DarkFooter />

      <PlatformSelectModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  </AosProvider>
);
}
