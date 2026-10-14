"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBell,
  FiMessageSquare,
  FiLogOut,
  FiClipboard,
  FiUser,
  FiAward,
  FiChevronRight,
  FiPlus,
  FiExternalLink,
} from "react-icons/fi";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LogoutModal } from "@/components/LogoutModal";
import { LearnerProgressChart } from "./LearnerProgressChart";
import { CohortCreateView } from "./CohortCreateView";
import { OrganizationCohortsList } from "./OrganizationCohortsList";
import { CohortDetailView, CohortDetailData } from "./CohortDetailView";
import { TransactionHistoryView } from "./TransactionHistoryView";
import { SettingsView } from "@/features/settings/pages/SettingsView";
import { useToast } from "@/components/ui/toast";
import { ASSETS_URL } from "@/assets";

export type DashboardTab =
  | "overview"
  | "cohorts"
  | "staffs"
  | "transactions"
  | "settings";

interface DashboardOverviewProps {
  initialOrgName?: string;
  initialLogoUrl?: string;
  userEmail?: string;
}

const INITIAL_LEARNERS = [
  {
    id: "l-1",
    name: "Tunde Bakare",
    trade: "Painting & Decoration",
    startDate: "12/04/2026",
    status: "Successful",
  },
  {
    id: "l-2",
    name: "Ifeoma Chukwu",
    trade: "Masonry",
    startDate: "12/04/2026",
    status: "Successful",
  },
  {
    id: "l-3",
    name: "Ifeoma Chukwu",
    trade: "Carpentry",
    startDate: "12/04/2026",
    status: "Pending",
  },
  {
    id: "l-4",
    name: "Ifeoma Chukwu",
    trade: "Masonry",
    startDate: "12/04/2026",
    status: "Pending",
  },
  {
    id: "l-5",
    name: "Ifeoma Chukwu",
    trade: "Masonry",
    startDate: "12/04/2026",
    status: "Successful",
  },
];

const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    name: "Oguntade James",
    trade: "Masonry",
    centre: "C-STEMP Hub",
    type: "RPL",
    status: "Pending",
    submittedAt: "07/22/2026",
  },
  {
    id: "app-2",
    name: "Favour Smith",
    trade: "Carpentry",
    centre: "NIIT Hub",
    type: "RPL",
    status: "Pending",
    submittedAt: "07/22/2026",
  },
  {
    id: "app-3",
    name: "Samson David",
    trade: "Plumbing",
    centre: "C-STEMP Hub",
    type: "NSQ",
    status: "In Progress",
    submittedAt: "07/22/2026",
  },
  {
    id: "app-4",
    name: "Oriade Sophie",
    trade: "Painting",
    centre: "C-STEMP Hub",
    type: "NSQ",
    status: "Pending",
    submittedAt: "07/22/2026",
  },
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  initialOrgName = "ABC Foundation Skills & Youth Empowerment",
  initialLogoUrl,
  userEmail,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [isCreatingCohort, setIsCreatingCohort] = useState(false);
  const [selectedCohortDetail, setSelectedCohortDetail] = useState<CohortDetailData | null>(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Dynamic Cohort Stats
  const [stats, setStats] = useState({
    totalCohorts: 10,
    ongoingCohorts: 2,
    pendingCohorts: 1,
    completedCohorts: 7,
    totalApplications: 1220,
    totalLearners: 4321,
    totalStaffs: 15,
    totalCertified: 6721,
  });

  const [cohortsList, setCohortsList] = useState<any[]>([
    {
      id: "COH-2026-01",
      name: "Dangote 2026 Technical Apprenticeship Cohort",
      model: "Combined Dual-Track (Training + Assessment)",
      totalCost: 3059500,
      traineesCount: 65,
      createdAt: "12/03/2026",
      status: "Ongoing",
    },
    {
      id: "COH-2026-02",
      name: "Federal TVET Artisans Upgrade Scheme",
      model: "Assessment Only (NSQ/RPL)",
      totalCost: 1800000,
      traineesCount: 40,
      createdAt: "04/02/2026",
      status: "Ongoing",
    },
  ]);

  const handleCohortSuccess = (newCohort: any) => {
    setIsCreatingCohort(false);
    setCohortsList((prev) => [newCohort, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalCohorts: prev.totalCohorts + 1,
      ongoingCohorts: prev.ongoingCohorts + 1,
      totalLearners: prev.totalLearners + newCohort.traineesCount,
    }));
    toast({
      type: "success",
      title: "Cohort Program Created",
      description: `${newCohort.name} has been successfully activated.`,
    });
  };

  const handleViewCohort = (cohort: any) => {
    const isNotStarted = cohort.status === "Not Started";
    setSelectedCohortDetail({
      id: cohort.id,
      name: cohort.name,
      programModel: cohort.model,
      totalSlots: cohort.totalSlots || 1000,
      availableSlots: isNotStarted ? 1000 : (cohort.availableSlots ?? 200),
      amountPaid: cohort.amountPaid || "₦3,000,000",
      pendingCount: isNotStarted ? "-" : 100,
      inProgressCount: isNotStarted ? "-" : 500,
      certifiedCount: isNotStarted ? "-" : 200,
      status: cohort.status,
    });
  };

  const navItems: { id: DashboardTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "cohorts", label: "Cohorts" },
    { id: "staffs", label: "Staffs & Team" },
    { id: "transactions", label: "Transaction History" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans select-text">
      {/* Top Header Banner (Screenshot 2) */}
      <header className="w-full bg-[#8F1532] text-white shadow-md transition-all select-none">
        <div className="max-w-7xl xl:max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col gap-6">
          {/* Top Bar: Logo, Navigation Pills, User Actions */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            {/* Logo */}
            <div className="shrink-0 cursor-pointer">
              <Logo theme="light" width={118} href="/" />
            </div>

            {/* Navigation Pills */}
            <nav className="hidden lg:flex items-center gap-1.5 shrink min-w-0">
              {navItems.map((item) => {
                const isActive = activeTab === item.id && !isCreatingCohort && !selectedCohortDetail;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIsCreatingCohort(false);
                      setSelectedCohortDetail(null);
                      setActiveTab(item.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-white/20 text-white shadow-xs"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* User Profile & Icons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  toast({
                    type: "info",
                    title: "Messages",
                    description: "No new unread messages.",
                  })
                }
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 transition-all cursor-pointer"
                title="Messages"
              >
                <FiMessageSquare className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  toast({
                    type: "info",
                    title: "Notifications",
                    description: "You have 2 pending verification requests.",
                  })
                }
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 transition-all cursor-pointer relative"
                title="Notifications"
              >
                <FiBell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f9a825]" />
              </button>

              {/* Institution Avatar / Badge */}
              <div
                onClick={() => setActiveTab("settings")}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/30 cursor-pointer shadow-xs"
                title="Profile"
              >
                {initialLogoUrl ? (
                  <Image
                    src={initialLogoUrl}
                    alt={initialOrgName}
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={ASSETS_URL.cstempLogo}
                    alt="Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => setIsLogoutOpen(true)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 transition-all cursor-pointer"
                title="Sign Out"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Welcome Title & + Create Cohort Button */}
          {!isCreatingCohort && !selectedCohortDetail && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl sm:text-2xl xl:text-3xl font-extrabold tracking-tight text-white truncate">
                  {activeTab === "cohorts"
                    ? "Organization Cohorts"
                    : activeTab === "transactions"
                    ? "Transaction History"
                    : activeTab === "settings"
                    ? "Settings"
                    : `Welcome Back, ${initialOrgName}`}
                </h1>

                <Button
                  type="button"
                  variant="amber"
                  size="md"
                  onClick={() => setIsCreatingCohort(true)}
                  className="h-11 px-5 text-white font-bold text-sm sm:text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-1.5 shrink-0"
                >
                  <FiPlus className="w-4 h-4 stroke-[3]" />
                  Create Cohort
                </Button>
              </div>

              {/* 8 Stat Cards Grid (Only displayed on Overview tab) */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
                  {/* Row 1 */}
                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Total Cohorts
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.totalCohorts}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          cohorts
                        </span>
                      </p>
                    </div>
                    <FiClipboard className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Ongoing Cohorts
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.ongoingCohorts}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          cohorts
                        </span>
                      </p>
                    </div>
                    <FiClipboard className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Pending Cohorts
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.pendingCohorts}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          cohorts
                        </span>
                      </p>
                    </div>
                    <FiClipboard className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Completed Cohorts
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.completedCohorts}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          staffs
                        </span>
                      </p>
                    </div>
                    <FiClipboard className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  {/* Row 2 */}
                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Total Applications
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.totalApplications.toLocaleString()}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          applications
                        </span>
                      </p>
                    </div>
                    <FiClipboard className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Total Learners
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.totalLearners.toLocaleString()}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          learners
                        </span>
                      </p>
                    </div>
                    <FiUser className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Total Staffs
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.totalStaffs}
                        <span className="text-xs sm:text-sm font-normal text-white/70 ml-1.5">
                          staffs
                        </span>
                      </p>
                    </div>
                    <FiUser className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xs rounded-2xl p-4 sm:p-5 flex items-start justify-between border border-white/10 shadow-xs">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white/80">
                        Total Certified
                      </span>
                      <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-white mt-1">
                        {stats.totalCertified.toLocaleString()}
                      </p>
                    </div>
                    <FiAward className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl xl:max-w-360 w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Render Cohort Creation flow if triggered */}
        {isCreatingCohort ? (
          <CohortCreateView
            onBack={() => setIsCreatingCohort(false)}
            onSuccess={handleCohortSuccess}
          />
        ) : selectedCohortDetail ? (
          /* COHORT DETAIL VIEW (media_1790802368791.png, media_1790802368929.png, media_1790802368952.png, media_1790802368957.png) */
          <CohortDetailView
            cohort={selectedCohortDetail}
            onBack={() => setSelectedCohortDetail(null)}
          />
        ) : activeTab === "overview" ? (
          /* TAB 1: OVERVIEW (Screenshot 2) */
          <>
            {/* Top 2 Columns: Learners Enrollment & Progress Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Learners Enrollment Table Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-primary">
                      Learners Enrollment
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCohortDetail(null);
                        setActiveTab("cohorts");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                    >
                      View All
                      <FiChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px] sm:text-xs">
                          <th className="pb-3 font-semibold">Learner&apos;s Name</th>
                          <th className="pb-3 font-semibold">Trade</th>
                          <th className="pb-3 font-semibold">Start Date</th>
                          <th className="pb-3 font-semibold text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {INITIAL_LEARNERS.map((learner) => (
                          <tr key={learner.id} className="hover:bg-gray-50/50">
                            <td className="py-3 font-bold text-gray-900">
                              {learner.name}
                            </td>
                            <td className="py-3 text-gray-600 font-medium">
                              {learner.trade}
                            </td>
                            <td className="py-3 text-gray-500">
                              {learner.startDate}
                            </td>
                            <td className="py-3 text-right">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                  learner.status === "Successful"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                }`}
                              >
                                {learner.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Progress Chart Card */}
              <LearnerProgressChart />
            </div>

            {/* Bottom Card: Recent Candidate Applications (Screenshot 2) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-neutral-primary">
                  Recent Candidate Applications
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      type: "info",
                      title: "Applications",
                      description: "Showing latest recent candidate applications.",
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer"
                >
                  View All
                  <FiChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px] sm:text-xs">
                      <th className="pb-3 font-semibold">Candidate Name</th>
                      <th className="pb-3 font-semibold">Trade</th>
                      <th className="pb-3 font-semibold">Assessment Centre</th>
                      <th className="pb-3 font-semibold">Assessment Type</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Submitted at</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {INITIAL_APPLICATIONS.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/50">
                        <td className="py-3.5 font-bold text-gray-900">
                          {app.name}
                        </td>
                        <td className="py-3.5 text-gray-600 font-medium">
                          {app.trade}
                        </td>
                        <td className="py-3.5 text-gray-700">
                          {app.centre}
                        </td>
                        <td className="py-3.5 text-gray-600 font-semibold">
                          {app.type}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              app.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-gray-500">
                          {app.submittedAt}
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              toast({
                                type: "info",
                                title: app.name,
                                description: `Viewing candidate dossier for ${app.trade} (${app.type})`,
                              })
                            }
                            className="font-bold text-gray-700 hover:text-primary transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeTab === "cohorts" ? (
          /* TAB 2: COHORTS (media_1790801091091.png) */
          <OrganizationCohortsList
            onCreateCohort={() => setIsCreatingCohort(true)}
            onViewCohort={handleViewCohort}
          />
        ) : activeTab === "staffs" ? (
          /* TAB 3: STAFFS & TEAM */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary">
                  Staffs &amp; Team Management
                </h2>
                <p className="text-xs sm:text-sm text-neutral-secondary mt-0.5">
                  Institutional coordinators, vocational mentors, and facilitators.
                </p>
              </div>

              <Button
                type="button"
                variant="amber"
                size="md"
                onClick={() =>
                  toast({
                    type: "info",
                    title: "Invite Staff",
                    description: "Staff invite modal will open.",
                  })
                }
                className="h-11 px-5 text-white font-bold text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-1.5"
              >
                <FiPlus className="w-4 h-4 stroke-[3]" />
                Invite Staff
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Dr. Ngozi Okafor", role: "Super Admin", email: "ngozi@org.elimi.africa" },
                { name: "Engr. Babatunde Lawal", role: "Technical Lead", email: "babatunde@org.elimi.africa" },
                { name: "Chidi Umeh", role: "Cohort Coordinator", email: "chidi@org.elimi.africa" },
              ].map((staff, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2"
                >
                  <span className="text-sm font-bold text-gray-900">{staff.name}</span>
                  <span className="text-xs font-semibold text-[#8F1532]">{staff.role}</span>
                  <span className="text-xs text-gray-500">{staff.email}</span>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "transactions" ? (
          /* TAB 4: TRANSACTION HISTORY */
          <TransactionHistoryView />
        ) : (
          /* TAB 5: SETTINGS */
          <SettingsView />
        )}
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </div>
  );
};
