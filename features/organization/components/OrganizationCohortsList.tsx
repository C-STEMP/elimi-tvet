"use client";

import React, { useState } from "react";
import { FiSearch, FiList, FiGrid } from "react-icons/fi";
import { Select } from "@/components/ui/select";
import { formatNaira } from "@/lib/currency";

export interface CohortItem {
  id: string;
  name: string;
  model: string;
  totalSlots: number;
  availableSlots: number | string;
  amountPaid: string;
  status: "Not Started" | "Ongoing" | "Completed";
  filterType: "duo" | "training" | "assessment";
}

interface OrganizationCohortsListProps {
  onCreateCohort: () => void;
  onViewCohort?: (cohort: CohortItem) => void;
}

const INITIAL_ORGANIZATION_COHORTS: CohortItem[] = [
  {
    id: "c-1",
    name: "FCT Youth Dual Track (Alpha)",
    model: "Duo (Training & NSQ)",
    totalSlots: 1000,
    availableSlots: "-",
    amountPaid: "₦3,000,000",
    status: "Not Started",
    filterType: "duo",
  },
  {
    id: "c-2",
    name: "FCT Youth Dual Track (Alpha)",
    model: "Duo (Training & NSQ)",
    totalSlots: 1000,
    availableSlots: 200,
    amountPaid: "₦3,000,000",
    status: "Ongoing",
    filterType: "duo",
  },
  {
    id: "c-3",
    name: "Lagos Industrial Assessment",
    model: "Assessment",
    totalSlots: 1000,
    availableSlots: 200,
    amountPaid: "₦3,000,000",
    status: "Ongoing",
    filterType: "assessment",
  },
  {
    id: "c-4",
    name: "Kano Heavy Industry",
    model: "Assessment",
    totalSlots: 1000,
    availableSlots: 200,
    amountPaid: "₦3,000,000",
    status: "Completed",
    filterType: "assessment",
  },
  {
    id: "c-5",
    name: "Lagos Industrial Assessment",
    model: "Training",
    totalSlots: 1000,
    availableSlots: 200,
    amountPaid: "₦3,000,000",
    status: "Completed",
    filterType: "training",
  },
];

type FilterTab = "all" | "duo" | "training" | "assessment";

export const OrganizationCohortsList: React.FC<OrganizationCohortsListProps> = ({
  onCreateCohort,
  onViewCohort,
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredCohorts = INITIAL_ORGANIZATION_COHORTS.filter((item) => {
    // Tab filter
    if (activeFilterTab !== "all" && item.filterType !== activeFilterTab) {
      return false;
    }
    // Search query
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.model.toLowerCase().includes(query);
    if (!matchesSearch) return false;

    // Status filter
    if (statusFilter !== "All" && item.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCohorts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCohorts.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: CohortItem["status"]) => {
    switch (status) {
      case "Not Started":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
            Not Started
          </span>
        );
      case "Ongoing":
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FFF4E5] text-[#D97706]">
            Ongoing
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#DDF4E6] text-[#1E7F4C]">
            Completed
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-text">
      {/* 4 Category Pill Buttons (media_1790801091091.png) */}
      <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-xs flex items-center gap-2 overflow-x-auto w-fit">
        <button
          type="button"
          onClick={() => setActiveFilterTab("all")}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeFilterTab === "all"
              ? "bg-[#8F1532] text-white shadow-xs"
              : "text-neutral-700 hover:text-black hover:bg-gray-50"
          }`}
        >
          All Cohorts
        </button>

        <button
          type="button"
          onClick={() => setActiveFilterTab("duo")}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeFilterTab === "duo"
              ? "bg-[#8F1532] text-white shadow-xs"
              : "text-neutral-700 hover:text-black hover:bg-gray-50"
          }`}
        >
          Duo Cohort
        </button>

        <button
          type="button"
          onClick={() => setActiveFilterTab("training")}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeFilterTab === "training"
              ? "bg-[#8F1532] text-white shadow-xs"
              : "text-neutral-700 hover:text-black hover:bg-gray-50"
          }`}
        >
          Training Only
        </button>

        <button
          type="button"
          onClick={() => setActiveFilterTab("assessment")}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeFilterTab === "assessment"
              ? "bg-[#8F1532] text-white shadow-xs"
              : "text-neutral-700 hover:text-black hover:bg-gray-50"
          }`}
        >
          Assessment Only
        </button>
      </div>

      {/* Main Table Card (media_1790801091091.png) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
        {/* Controls Bar: Search + Status dropdown + view mode */}
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
                { label: "Not Started", value: "Not Started" },
                { label: "Ongoing", value: "Ongoing" },
                { label: "Completed", value: "Completed" },
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

        {/* Cohort Table */}
        {filteredCohorts.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 font-normal">No cohorts found.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCohorts.map((cohort) => (
              <div
                key={cohort.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#8F1532] bg-rose-50 px-2 py-0.5 rounded-md">
                      {cohort.model}
                    </span>
                    {getStatusBadge(cohort.status)}
                  </div>
                  <h3 className="text-base font-bold text-neutral-primary mt-1">
                    {cohort.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-neutral-secondary pt-2 border-t border-gray-100">
                    <span>Total: <strong>{cohort.totalSlots}</strong></span>
                    <span>Available: <strong>{cohort.availableSlots}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="font-extrabold text-neutral-primary text-sm">
                    {cohort.amountPaid}
                  </span>
                  <button
                    type="button"
                    onClick={() => onViewCohort?.(cohort)}
                    className="text-xs font-bold text-neutral-primary hover:text-[#8F1532] underline cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-180">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-500 text-xs font-semibold uppercase tracking-wider rounded-xl">
                  <th className="p-3.5 rounded-l-xl w-10">
                    <input
                      type="checkbox"
                      checked={
                        filteredCohorts.length > 0 &&
                        selectedIds.length === filteredCohorts.length
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-[#8F1532] focus:ring-[#8F1532] cursor-pointer"
                    />
                  </th>
                  <th className="p-3.5">Cohort Name</th>
                  <th className="p-3.5">Program Model</th>
                  <th className="p-3.5">Total Slot</th>
                  <th className="p-3.5">Available Slot</th>
                  <th className="p-3.5">Amount Paid</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-neutral-primary">
                {filteredCohorts.map((cohort) => {
                  const isChecked = selectedIds.includes(cohort.id);
                  return (
                    <tr
                      key={cohort.id}
                      className={`hover:bg-gray-50/60 transition-colors ${
                        isChecked ? "bg-rose-50/20" : ""
                      }`}
                    >
                      <td className="p-3.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(cohort.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#8F1532] focus:ring-[#8F1532] cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5 font-bold text-neutral-primary">
                        {cohort.name}
                      </td>
                      <td className="p-3.5 text-neutral-secondary">
                        {cohort.model}
                      </td>
                      <td className="p-3.5 text-neutral-primary">
                        {cohort.totalSlots}
                      </td>
                      <td className="p-3.5 text-neutral-primary">
                        {cohort.availableSlots}
                      </td>
                      <td className="p-3.5 font-bold text-neutral-primary">
                        {cohort.amountPaid}
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(cohort.status)}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => onViewCohort?.(cohort)}
                          className="text-neutral-primary font-bold text-xs underline hover:text-[#8F1532] transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
