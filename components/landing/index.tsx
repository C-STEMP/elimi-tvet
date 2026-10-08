"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LandingPageView } from "./LandingPageView";
import { GatewaySection, AuthMode } from "./GatewaySection";

function LandingPageContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const modeParam = searchParams.get("mode");
  const mode: AuthMode = modeParam === "login" ? "login" : "register";

  if (view === "gateway") {
    return <GatewaySection initialMode={mode} />;
  }

  return <LandingPageView />;
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LandingPageContent />
    </Suspense>
  );
}
