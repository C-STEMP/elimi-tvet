"use client";

import React, { useState } from "react";
import { FiSearch, FiList, FiGrid } from "react-icons/fi";
import { Select } from "@/components/ui/select";
import { ReceiptModal } from "./ReceiptModal";
import { TransactionReceiptData } from "@/features/settings/types/settings.types";

const INITIAL_TRANSACTIONS: TransactionReceiptData[] = [
  {
    id: "tx-1",
    candidateName: "Tunde Bakare",
    assessmentType: "RPL Assessment",
    amountPaid: "₦45,000",
    status: "Paid",
    date: "2023-12-01",
    transactionId: "TXN_12345_ABCDE",
    paymentMethod: "Paystack",
    description: "Recognition of prior learning assessment fee",
    cohortName: "Abuja Solar Installation 2026",
    programModel: "RPL (Direct Assessment)",
  },
  {
    id: "tx-2",
    candidateName: "Dangote Cement PLC",
    assessmentType: "Workforce Cohort Sponsorship",
    amountPaid: "₦3,750,000",
    status: "Paid",
    date: "2026-03-24",
    transactionId: "TXN_98765_DANGOTE",
    paymentMethod: "Bank Transfer",
    description: "Full sponsorship for 25 Heavy Duty Equipment Mechanics",
    cohortName: "Heavy Machinery Cohort Alpha",
    programModel: "Institutional Sponsored RPL",
  },
  {
    id: "tx-3",
    candidateName: "Julius Berger Nigeria",
    assessmentType: "Dual Apprenticeship Cohort",
    amountPaid: "₦2,400,000",
    status: "Paid",
    date: "2026-03-18",
    transactionId: "TXN_45678_JB",
    paymentMethod: "Direct Payment",
    description: "Dual Vocational Apprenticeship Training & Assessment",
    cohortName: "Lagos Highway Construction Cohort",
    programModel: "Dual Vocational Apprenticeship",
  },
  {
    id: "tx-4",
    candidateName: "Ifeoma Chukwu",
    assessmentType: "Modular TVET Assessment",
    amountPaid: "₦50,000",
    status: "Pending",
    date: "2026-03-29",
    transactionId: "TXN_11223_IFEOMA",
    paymentMethod: "Paystack",
    description: "Modular certification fee for carpentry unit 3",
    cohortName: "South-East Artisans Cohort",
    programModel: "Modular TVET Up-skilling",
  },
  {
    id: "tx-5",
    candidateName: "Borno State Reconstruction Agency",
    assessmentType: "Post-Conflict Reconstruction Training",
    amountPaid: "₦6,000,000",
    status: "Paid",
    date: "2026-03-10",
    transactionId: "TXN_88776_BORNO",
    paymentMethod: "Government Grant",
    description: "Vocational empowerment for 40 returning masonry trainees",
    cohortName: "Maiduguri Rebuild Batch 1",
    programModel: "Donor-Funded TVET Program",
  },
];

export const TransactionHistoryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<TransactionReceiptData | null>(null);

  const filteredTransactions = INITIAL_TRANSACTIONS.filter((tx) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      tx.candidateName.toLowerCase().includes(query) ||
      tx.assessmentType.toLowerCase().includes(query) ||
      (tx.cohortName && tx.cohortName.toLowerCase().includes(query)) ||
      (tx.programModel && tx.programModel.toLowerCase().includes(query)) ||
      tx.transactionId.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Successful" && tx.status === "Paid") ||
      (statusFilter === "Pending" && tx.status === "Pending");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col gap-6 select-text">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
          Transaction History
        </h2>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates or cohorts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-gray-200/80 focus:border-[#8F1532]/40 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-neutral-primary outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select
              containerClassName="w-36"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { label: "Status: All", value: "All" },
                { label: "Successful", value: "Successful" },
                { label: "Pending", value: "Pending" },
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

        {filteredTransactions.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 font-normal">No transactions found.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedReceiptTx(tx)}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex items-start justify-between relative group cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-sm text-neutral-primary group-hover:text-[#8F1532] transition-colors">
                    {tx.candidateName}
                  </span>
                  <span className="text-xs text-neutral-secondary">
                    {tx.cohortName || tx.assessmentType}
                  </span>
                  <span className="text-xs text-neutral-primary font-bold">
                    Amount: {tx.amountPaid}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {tx.date}
                  </span>
                </div>

                <div className="flex flex-col items-end justify-between h-full gap-4">
                  {tx.status === "Paid" ? (
                    <span className="bg-[#1E7F4C]/10 text-[#1E7F4C] font-semibold px-3 py-1 rounded-full text-xs inline-block">
                      Successful
                    </span>
                  ) : (
                    <span className="bg-[#f9a825]/10 text-[#f9a825] font-semibold px-3 py-1 rounded-full text-xs inline-block">
                      Pending
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReceiptTx(tx);
                    }}
                    className="text-xs lg:text-sm text-neutral-primary font-bold underline hover:text-[#8F1532] transition-colors cursor-pointer mt-2"
                  >
                    Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-160">
              <thead>
                <tr className="bg-[#F8F9FA] text-gray-500 text-xs font-semibold uppercase tracking-wider rounded-xl">
                  <th className="p-3.5 rounded-l-xl">Cohort / Candidate Name</th>
                  <th className="p-3.5">Program Model</th>
                  <th className="p-3.5">Amount Paid</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-neutral-primary">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedReceiptTx(tx)}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer group"
                  >
                    <td className="p-3.5 font-bold text-neutral-primary group-hover:text-[#8F1532] transition-colors">
                      <div>{tx.candidateName}</div>
                      {tx.cohortName && (
                        <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                          {tx.cohortName}
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 text-neutral-secondary">
                      {tx.programModel || tx.assessmentType}
                    </td>
                    <td className="p-3.5 font-bold text-neutral-primary">
                      {tx.amountPaid}
                    </td>
                    <td className="p-3.5 text-neutral-secondary text-xs">
                      {tx.date}
                    </td>
                    <td className="p-3.5">
                      {tx.status === "Paid" ? (
                        <span className="bg-[#1E7F4C]/10 text-[#1E7F4C] font-semibold px-3 py-1 rounded-full text-xs inline-block">
                          Successful
                        </span>
                      ) : (
                        <span className="bg-[#f9a825]/10 text-[#f9a825] font-semibold px-3 py-1 rounded-full text-xs inline-block">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReceiptTx(tx);
                        }}
                        className="text-neutral-primary font-bold text-xs underline hover:text-[#8F1532] transition-colors cursor-pointer"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ReceiptModal
        isOpen={Boolean(selectedReceiptTx)}
        transaction={selectedReceiptTx}
        onClose={() => setSelectedReceiptTx(null)}
      />
    </div>
  );
};
