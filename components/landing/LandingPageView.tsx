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

export function LandingPageView() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleOpenAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white select-text">
      {/* 1. Navbar with active Home & Role Modal trigger */}
      <WhiteNavbar onOpenAuthModal={handleOpenAuthModal} />

      <main className="flex-1">
        {/* 2. Hero Section: "Unlock Skills That Will Shape Your Future" */}
        <MainHeroSection onOpenAuthModal={handleOpenAuthModal} />

        {/* 3. Partner Strip */}
        <PartnerStripSection />

        {/* 4. "Our Most Popular Courses" */}
        <PopularCoursesSection />

        {/* 5. "Get Assessed With Our Competency Assessment Platform" (CAP & RPL) */}
        <AssessmentPlatformSection />

        {/* 6. "Get Hired and Hire Professionals Through Our Job Portal" (Workmasters) */}
        <JobPortalSection />

        {/* 7. "Our Positive Social Impact" */}
        <SocialImpactSection />

        {/* 8. "Frequently Asked Questions" */}
        <FaqAccordionSection />

        {/* 9. "Build A Stronger, More Skilled Workforce" CTA Banner */}
        <WorkforceCtaBanner onOpenAuthModal={handleOpenAuthModal} />
      </main>

      {/* 10. Modern Dark Footer */}
      <DarkFooter />

      {/* Platform & Role Selection Modal */}
      <PlatformSelectModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
