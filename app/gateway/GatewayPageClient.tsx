"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { GatewaySection, AuthMode } from "@/components/landing/GatewaySection";

export default function GatewayPageClient() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const mode: AuthMode = modeParam === "login" ? "login" : "register";

  return <GatewaySection initialMode={mode} />;
}
