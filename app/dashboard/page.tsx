"use client";

import React, { useEffect, useState } from "react";
import { DashboardOverview } from "@/features/organization/components/DashboardOverview";
import { getUser, getInstitutionData } from "@/lib/auth-storage";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [orgName, setOrgName] = useState(
    "ABC Foundation Skills & Youth Empowerment",
  );
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    const user = getUser();
    const inst = getInstitutionData();

    if (inst?.organizationName) {
      setOrgName(inst.organizationName);
    }
    if (inst?.logoUrl) {
      setLogoUrl(inst.logoUrl);
    }
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-hover border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardOverview
      initialOrgName={orgName}
      initialLogoUrl={logoUrl}
      userEmail={userEmail}
    />
  );
}
