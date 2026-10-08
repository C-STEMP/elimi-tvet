"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { formatNaira } from "@/lib/currency";

export interface TrainingTrackItem {
  id: string;
  trade: string;
  scope: string;
  slots: number;
  ratePerSlot: number;
  subtotal: number;
}

export interface AssessmentStreamItem {
  id: string;
  pathway: string;
  centre: string;
  level: string;
  seats: number;
  ratePerSeat: number;
  subtotal: number;
}

interface CohortReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cohortName: string;
  programModel: string;
  trainingTracks: TrainingTrackItem[];
  assessmentStreams: AssessmentStreamItem[];
  totalCost: number;
  onConfirmPayment: () => void;
}

export const CohortReviewModal: React.FC<CohortReviewModalProps> = ({
  isOpen,
  onClose,
  cohortName,
  programModel,
  trainingTracks,
  assessmentStreams,
  totalCost,
  onConfirmPayment,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 select-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl transform overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
              Review Cohort Program Request
            </h2>
            <p className="text-neutral-secondary text-xs sm:text-sm font-normal mt-1">
              Confirm curriculum tracks, assigned assessment centres, and applicable fees.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#FFF5F6] hover:bg-[#FCEAEF] text-[#8F1532] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Metadata Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-gray-400 font-medium">Cohort Name:</span>
            <p className="font-bold text-gray-900 mt-0.5 truncate">
              {cohortName || "Dangote 2026 Technical Apprenticeship Cohort"}
            </p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">Program Model:</span>
            <p className="font-bold text-gray-900 mt-0.5 truncate">
              {programModel || "Combined Dual-Track (Training + Assessment)"}
            </p>
          </div>
        </div>

        {/* LMS Training Tracks Section */}
        {trainingTracks.length > 0 && (
          <div className="flex flex-col gap-2.5 pt-2">
            <h3 className="text-sm font-bold text-[#8F1532]">
              LMS Training Tracks ({trainingTracks.length}):
            </h3>
            <div className="space-y-2">
              {trainingTracks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-gray-50 last:border-b-0"
                >
                  <span className="text-gray-700 font-medium">
                    {item.trade} ({item.scope}) — {item.slots} slots @{" "}
                    {formatNaira(item.ratePerSlot)}
                  </span>
                  <span className="font-bold text-gray-900">
                    {formatNaira(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assessment Streams Section */}
        {assessmentStreams.length > 0 && (
          <div className="flex flex-col gap-2.5 pt-2">
            <h3 className="text-sm font-bold text-[#8F1532]">
              Assessment Streams ({assessmentStreams.length}):
            </h3>
            <div className="space-y-2">
              {assessmentStreams.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-gray-50 last:border-b-0"
                >
                  <span className="text-gray-700 font-medium">
                    {item.pathway} at {item.centre} ({item.level}) — {item.seats}{" "}
                    seats
                  </span>
                  <span className="font-bold text-gray-900">
                    {formatNaira(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Cost Highlight Box */}
        <div className="w-full bg-[#FFF5F6] border border-[#F4B4C1] rounded-2xl p-4 sm:p-5 flex items-center justify-between mt-2">
          <span className="text-sm sm:text-base font-semibold text-gray-800">
            Total Program Cost:
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#8F1532]">
            {formatNaira(totalCost)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>

          <Button
            type="button"
            variant="amber"
            size="md"
            onClick={onConfirmPayment}
            className="h-11 sm:h-12 px-6 sm:px-8 text-white font-bold text-sm sm:text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-2"
          >
            Make Payment
            <HiOutlineArrowNarrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
