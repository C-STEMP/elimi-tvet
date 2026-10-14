"use client";

import React, { useState } from "react";
import { WhiteNavbar } from "./WhiteNavbar";
import { ContactHeroBanner } from "./ContactHeroBanner";
import { ContactDetailsAndForm } from "./ContactDetailsAndForm";
import { WorkforceCtaBanner } from "./WorkforceCtaBanner";
import { DarkFooter } from "./DarkFooter";
import { PlatformSelectModal, AuthMode } from "./PlatformSelectModal";
import { AosProvider } from "./AosProvider";

export function ContactLandingView() {
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
          <ContactHeroBanner />
          <ContactDetailsAndForm />
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
