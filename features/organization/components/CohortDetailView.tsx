"use client";

import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSearch,
  FiList,
  FiGrid,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { BulkEnrollModal } from "./BulkEnrollModal";
import { SingleEnrollModal } from "./SingleEnrollModal";
import { useToast } from "@/components/ui/toast";

export interface CohortDetailData {
  id: string;
  name: string;
  programModel: string;
  totalSlots: number;
  availableSlots: number | string;
  amountPaid: string;
  pendingCount: number | string;
  inProgressCount: number | string;
  certifiedCount: number | string;
  status: "Not Started" | "Ongoing" | "Completed";
}

interface CohortDetailViewProps {
  cohort: CohortDetailData;
  onBack: () => void;
}

const INITIAL_COHORT_LEARNERS = [
  { id: "l-1", name: "Tunde Bakare", trade: "Painting & Decoration", startDate: "12/04/2026", status: "Completed" },
  { id: "l-2", name: "Ifeoma Chukwu", trade: "Masonry", startDate: "12/04/2026", status: "Completed" },
  { id: "l-3", name: "Ifeoma Chukwu", trade: "Masonry", startDate: "12/04/2026", status: "Completed" },
  { id: "l-4", name: "Ifeoma Chukwu", trade: "Carpentry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-5", name: "Ifeoma Chukwu", trade: "Carpentry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-6", name: "Ifeoma Chukwu", trade: "Carpentry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-7", name: "Ifeoma Chukwu", trade: "Carpentry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-8", name: "Ifeoma Chukwu", trade: "Carpentry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-9", name: "Ifeoma Chukwu", trade: "Carpentry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-10", name: "Ifeoma Chukwu", trade: "Masonry", startDate: "12/04/2026", status: "Ongoing" },
  { id: "l-11", name: "Ifeoma Chukwu", trade: "Masonry", startDate: "12/04/2026", status: "Completed" },
];

const INITIAL_COHORT_APPLICATIONS = [
  {
    id: "app-1",
    name: "Oguntade James",
    trade: "Masonry",
    centre: "C-STEMP Hub",
    type: "RPL",
    status: "Ongoing",
    submittedAt: "07/22/2026",
  },
  {
    id: "app-2",
    name: "Favour Smith",
    trade: "Carpentry",
    centre: "NIIT Hub",
    type: "RPL",
    status: "Ongoing",
    submittedAt: "07/22/2026",
  },
  {
    id: "app-3",
    name: "Samson David",
    trade: "Plumbing",
    centre: "C-STEMP Hub",
    type: "NSQ",
    status: "Completed",
    submittedAt: "07/22/2026",
  },
  {
    id: "app-4",
    name: "Oriade Sophie",
    trade: "Painting",
    centre: "C-STEMP Hub",
    type: "NSQ",
    status: "Completed",
    submittedAt: "07/22/2026",
  },
];

export const CohortDetailView: React.FC<CohortDetailViewProps> = ({
  cohort,
  onBack,
}) => {
  const { toast } = useToast();
  const [activeTrack, setActiveTrack] = useState<"training" | "assessment">("training");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);

  const [learners, setLearners] = useState(
    cohort.status === "Not Started" ? [] : INITIAL_COHORT_LEARNERS
  );
  const [applications, setApplications] = useState(INITIAL_COHORT_APPLICATIONS);

  const [liveStats, setLiveStats] = useState({
    availableSlots: cohort.availableSlots,
    pendingCount: cohort.pendingCount,
    inProgressCount: cohort.inProgressCount,
    certifiedCount: cohort.certifiedCount,
    status: cohort.status,
  });

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);

  // Status Badge
  const renderStatusBadge = (status: string) => {
    if (status === "Completed") {
      return (
        <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-semibold bg-[#DDF4E6] text-[#1E7F4C]">
          Completed
        </span>
      );
    }
    if (status === "Ongoing") {
      return (
        <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D97706]">
          Ongoing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
        {status}
      </span>
    );
  };

  // Filter learners
  const filteredLearners = learners.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.trade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.centre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBulkSuccess = (count: number) => {
    const newItems = INITIAL_COHORT_LEARNERS;
    setLearners(newItems);
    setLiveStats({
      availableSlots: 200,
      pendingCount: 100,
      inProgressCount: 500,
      certifiedCount: 200,
      status: "Ongoing",
    });
    toast({
      type: "success",
      title: "Batch Enrolled Successfully",
      description: `Successfully enrolled ${count} trainees into ${cohort.name}.`,
    });
  };

  const handleSingleSuccess = (newLearner: any) => {
    setLearners((prev) => [newLearner, ...prev]);
    setLiveStats((prev) => ({
      ...prev,
      availableSlots: typeof prev.availableSlots === "number" ? Math.max(0, prev.availableSlots - 1) : 199,
      status: "Ongoing",
    }));
    toast({
      type: "success",
      title: "Learner Enrolled",
      description: `${newLearner.name} has been enrolled into ${cohort.name}.`,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 select-text pb-10">
      {/* 1. Burgundy Banner Header with Action Buttons (media_1790802368791.png) */}
      <div className="w-full bg-[#8F1532] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold hover:underline cursor-pointer"
          >
            <FiArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span>{cohort.name}</span>
          </button>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70 font-medium">
            <button
              type="button"
              onClick={onBack}
              className="hover:underline cursor-pointer"
            >
              Cohort
            </button>
            <span>&gt;</span>
            <span className="text-white">{cohort.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setIsSingleModalOpen(true)}
            className="h-11 px-5 text-white font-bold text-xs sm:text-sm bg-transparent hover:bg-white/10 border border-white/60 transition-all rounded-xl cursor-pointer flex items-center gap-1.5"
          >
            <span>Enroll</span>
            <FiPlus className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="amber"
            size="md"
            onClick={() => setIsBulkModalOpen(true)}
            className="h-11 px-5 text-white font-bold text-xs sm:text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-1.5"
          >
            <span>Bulk Enroll Learners</span>
            <FiPlus className="w-4 h-4 stroke-[3]" />
          </Button>
        </div>
      </div>

      {/* 2. Eight KPI Metric Stat Cards (media_1790802368791.png) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Row 1 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            PROGRAM MODEL
          </span>
          <p className="text-sm sm:text-base font-extrabold text-neutral-primary mt-1 truncate">
            {cohort.programModel || "Training & NSQ"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            TOTAL SLOT
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-1">
            {cohort.totalSlots}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            AVAILABLE SLOT
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-1">
            {liveStats.availableSlots}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            AMOUNT PAID
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-1 truncate">
            {cohort.amountPaid}
          </p>
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            PENDING
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-1">
            {liveStats.pendingCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            IN PROGRESS
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-1">
            {liveStats.inProgressCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            CERTIFIED
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-1">
            {liveStats.certifiedCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase text-gray-400">
            STATUS
          </span>
          <div className="mt-1.5">
            {liveStats.status === "Ongoing" ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D97706]">
                Ongoing
              </span>
            ) : liveStats.status === "Completed" ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#DDF4E6] text-[#1E7F4C]">
                Completed
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D97706]">
                Not Started
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Track Tabs: Training Track vs Assessment Track (media_1790802368791.png & media_1790802368929.png) */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 shadow-xs flex items-center gap-3 w-fit">
        <button
          type="button"
          onClick={() => setActiveTrack("training")}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTrack === "training"
              ? "bg-[#8F1532] text-white shadow-xs"
              : "bg-input-bg text-gray-600 hover:text-gray-900"
          }`}
        >
          Training Track
        </button>
        <button
          type="button"
          onClick={() => setActiveTrack("assessment")}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTrack === "assessment"
              ? "bg-[#8F1532] text-white shadow-xs"
              : "bg-input-bg text-gray-600 hover:text-gray-900"
          }`}
        >
          Assessment Track
        </button>
      </div>

      {/* 4. Table Views */}
      {activeTrack === "training" ? (
        /* Training Track: Enrolment Table (media_1790802368791.png & media_1790802368952.png & empty media_1790802368957.png) */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-neutral-primary">
              Enrolment
            </h2>
            <button
              type="button"
              onClick={() =>
                toast({
                  type: "info",
                  title: "View All",
                  description: "Full trainee directory listing will load.",
                })
              }
              className="text-xs sm:text-sm font-bold text-[#8F1532] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <span>&gt;</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-gray-200/80 focus:border-[#8F1532]/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-neutral-primary outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <Select
                containerClassName="w-32"
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                options={[
                  { label: "Status", value: "All" },
                  { label: "Completed", value: "Completed" },
                  { label: "Ongoing", value: "Ongoing" },
                ]}
              />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#FCE8EC] text-[#8F1532] shadow-2xs"
                      : "bg-[#EAEBED] text-gray-700 hover:text-neutral-primary"
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#FCE8EC] text-[#8F1532] shadow-2xs"
                      : "bg-[#EAEBED] text-gray-700 hover:text-neutral-primary"
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State vs Populated Table (media_1790802368957.png) */}
          {filteredLearners.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#FCE8EC] flex items-center justify-center text-[#8F1532]">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-primary">
                No learner yet
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Enroll trainees individually or upload candidates in bulk.
              </p>
              <Button
                type="button"
                variant="amber"
                size="md"
                onClick={() => setIsBulkModalOpen(true)}
                className="mt-2 h-11 px-6 text-white font-bold text-xs sm:text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-1.5"
              >
                <span>Bulk Enroll Learners</span>
                <FiPlus className="w-4 h-4 stroke-[3]" />
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLearners.map((learner) => (
                <div
                  key={learner.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-primary">
                      {learner.name}
                    </span>
                    {renderStatusBadge(learner.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-secondary pt-2 border-t border-gray-100">
                    <span>Trade: <strong>{learner.trade}</strong></span>
                    <span>{learner.startDate}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-160">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-500 text-xs font-semibold uppercase tracking-wider rounded-xl">
                    <th className="p-3.5 rounded-l-xl">Learner&apos;s Name</th>
                    <th className="p-3.5">Trade</th>
                    <th className="p-3.5">Start Date</th>
                    <th className="p-3.5 text-right rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-neutral-primary">
                  {filteredLearners.map((learner) => (
                    <tr
                      key={learner.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="p-3.5 font-bold text-neutral-primary">
                        {learner.name}
                      </td>
                      <td className="p-3.5 text-neutral-secondary">
                        {learner.trade}
                      </td>
                      <td className="p-3.5 text-neutral-secondary">
                        {learner.startDate}
                      </td>
                      <td className="p-3.5 text-right">
                        {renderStatusBadge(learner.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls (media_1790802368952.png) */}
          {filteredLearners.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === 1
                    ? "bg-[#f9a825] text-white shadow-xs"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                1
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === 2
                    ? "bg-[#f9a825] text-white shadow-xs"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                2
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === 3
                    ? "bg-[#f9a825] text-white shadow-xs"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                3
              </button>

              <span className="px-1 text-gray-400 text-xs">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(38)}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all cursor-pointer"
              >
                38
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(39)}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all cursor-pointer"
              >
                39
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(39, p + 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Assessment Track: Candidate Applications Table (media_1790802368929.png) */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-neutral-primary">
              Candidate Applications
            </h2>
            <button
              type="button"
              onClick={() =>
                toast({
                  type: "info",
                  title: "View All",
                  description: "Full candidate assessment records will load.",
                })
              }
              className="text-xs sm:text-sm font-bold text-[#8F1532] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <span>&gt;</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-gray-200/80 focus:border-[#8F1532]/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-neutral-primary outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <Select
                containerClassName="w-32"
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                options={[
                  { label: "Status", value: "All" },
                  { label: "Completed", value: "Completed" },
                  { label: "Ongoing", value: "Ongoing" },
                ]}
              />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#FCE8EC] text-[#8F1532] shadow-2xs"
                      : "bg-[#EAEBED] text-gray-700 hover:text-neutral-primary"
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#FCE8EC] text-[#8F1532] shadow-2xs"
                      : "bg-[#EAEBED] text-gray-700 hover:text-neutral-primary"
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-180">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-500 text-xs font-semibold uppercase tracking-wider rounded-xl">
                  <th className="p-3.5 rounded-l-xl">Candidate Name</th>
                  <th className="p-3.5">Trade</th>
                  <th className="p-3.5">Assessment Centre</th>
                  <th className="p-3.5">Assessment Type</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Submitted at</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-neutral-primary">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="p-3.5 font-bold text-neutral-primary">
                      {app.name}
                    </td>
                    <td className="p-3.5 text-neutral-secondary">
                      {app.trade}
                    </td>
                    <td className="p-3.5 text-neutral-primary">
                      {app.centre}
                    </td>
                    <td className="p-3.5 text-neutral-secondary">
                      {app.type}
                    </td>
                    <td className="p-3.5">
                      {renderStatusBadge(app.status)}
                    </td>
                    <td className="p-3.5 text-neutral-secondary">
                      {app.submittedAt}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          toast({
                            type: "info",
                            title: app.name,
                            description: `Opening portfolio assessment file for ${app.name}.`,
                          })
                        }
                        className="text-neutral-primary font-bold text-xs underline hover:text-[#8F1532] transition-colors cursor-pointer"
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
      )}

      {/* Bulk Enroll Modal */}
      <BulkEnrollModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        cohortName={cohort.name}
        trainingSlots={150}
        assessmentSlots={100}
        onSuccess={handleBulkSuccess}
      />

      {/* Single Enroll Modal */}
      <SingleEnrollModal
        isOpen={isSingleModalOpen}
        onClose={() => setIsSingleModalOpen(false)}
        cohortName={cohort.name}
        onSuccess={handleSingleSuccess}
      />
    </div>
  );
};
