"use client";

import React, { useState } from "react";
import { FiArrowLeft, FiTrash2, FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { formatNaira } from "@/lib/currency";
import {
  CohortReviewModal,
  TrainingTrackItem,
  AssessmentStreamItem,
} from "./CohortReviewModal";
import { PaymentSuccessModal } from "./PaymentSuccessModal";

type ProgramModel = "training_only" | "assessment_only" | "duo";
type ActiveTrack = "training" | "assessment";

interface CohortCreateViewProps {
  onBack: () => void;
  onSuccess: (newCohort: any) => void;
}

const TRADE_OPTIONS = [
  { label: "Plumbing", value: "Plumbing", price: 25000 },
  { label: "Carpentry", value: "Carpentry", price: 35000 },
  { label: "Masonry", value: "Masonry", price: 25000 },
  { label: "Painting & Decoration", value: "Painting & Decoration", price: 20000 },
  { label: "Electrical Installation", value: "Electrical Installation", price: 30000 },
  { label: "Welding & Fabrication", value: "Welding & Fabrication", price: 40000 },
];

const SCOPE_OPTIONS = [
  { label: "Level 1", value: "Level 1" },
  { label: "Level 2", value: "Level 2" },
  { label: "Level 3", value: "Level 3" },
  { label: "Complete Trade (All Levels)", value: "Complete Trade (All Levels)" },
];

const PATHWAY_OPTIONS = [
  { label: "RPL", value: "RPL" },
  { label: "NSQ", value: "NSQ" },
];

const CENTRE_OPTIONS = [
  { label: "C-STEMP Hub", value: "C-STEMP Hub" },
  { label: "NIIT Hub", value: "NIIT Hub" },
  { label: "Lagos State TVET Centre", value: "Lagos State TVET Centre" },
  { label: "Abuja Technology Village", value: "Abuja Technology Village" },
];

const LEVEL_FEE_OPTIONS = [
  { label: "Level 1 (₦25,000/seat)", value: "Level 1", price: 25000 },
  { label: "Level 2 (₦35,000/seat)", value: "Level 2", price: 35000 },
  { label: "Level 3 (₦50,000/seat)", value: "Level 3", price: 50000 },
  { label: "Complete Trade (₦70,000/seat)", value: "Complete Trade (All Levels)", price: 70000 },
];

export const CohortCreateView: React.FC<CohortCreateViewProps> = ({
  onBack,
  onSuccess,
}) => {
  const { toast } = useToast();

  const [cohortName, setCohortName] = useState("");
  const [programModel, setProgramModel] = useState<ProgramModel>("duo");
  const [activeTrack, setActiveTrack] = useState<ActiveTrack>("assessment");

  // Training Tracks (default 3 empty items matching Screenshot 5)
  const [trainingTracks, setTrainingTracks] = useState<TrainingTrackItem[]>([
    {
      id: "tt-1",
      trade: "Plumbing",
      scope: "Level 1",
      slots: 40,
      ratePerSlot: 25000,
      subtotal: 1000000,
    },
    {
      id: "tt-2",
      trade: "Carpentry",
      scope: "Level 1",
      slots: 40,
      ratePerSlot: 25000,
      subtotal: 1000000,
    },
    {
      id: "tt-3",
      trade: "Masonry",
      scope: "Level 1",
      slots: 40,
      ratePerSlot: 25000,
      subtotal: 1000000,
    },
  ]);

  // Assessment Streams (default 3 items matching Screenshot 1)
  const [assessmentStreams, setAssessmentStreams] = useState<
    AssessmentStreamItem[]
  >([
    {
      id: "as-1",
      pathway: "RPL",
      centre: "C-STEMP Hub",
      level: "Level 1",
      seats: 40,
      ratePerSeat: 25000,
      subtotal: 1000000,
    },
    {
      id: "as-2",
      pathway: "RPL",
      centre: "C-STEMP Hub",
      level: "Level 1",
      seats: 40,
      ratePerSeat: 25000,
      subtotal: 1000000,
    },
    {
      id: "as-3",
      pathway: "RPL",
      centre: "C-STEMP Hub",
      level: "Level 1",
      seats: 40,
      ratePerSeat: 25000,
      subtotal: 1000000,
    },
  ]);

  // Modals
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);

  // Add more Training Track
  const handleAddTrade = () => {
    const newId = `tt-${Date.now()}`;
    setTrainingTracks((prev) => [
      ...prev,
      {
        id: newId,
        trade: "Masonry",
        scope: "Level 1",
        slots: 40,
        ratePerSlot: 25000,
        subtotal: 1000000,
      },
    ]);
  };

  const handleRemoveTrade = (id: string) => {
    if (trainingTracks.length <= 1) {
      toast({
        type: "error",
        title: "At least one trade is required",
        description: "Please keep at least one training track.",
      });
      return;
    }
    setTrainingTracks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTrade = (
    id: string,
    field: keyof TrainingTrackItem,
    value: any,
  ) => {
    setTrainingTracks((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "trade") {
          const match = TRADE_OPTIONS.find((o) => o.value === value);
          if (match?.price) updated.ratePerSlot = match.price;
        }
        if (field === "slots" || field === "trade") {
          const slotsNum =
            field === "slots" ? parseInt(value, 10) || 0 : item.slots;
          updated.slots = slotsNum;
          updated.subtotal = slotsNum * updated.ratePerSlot;
        }
        return updated;
      }),
    );
  };

  // Add more Assessment Stream
  const handleAddAssessment = () => {
    const newId = `as-${Date.now()}`;
    setAssessmentStreams((prev) => [
      ...prev,
      {
        id: newId,
        pathway: "RPL",
        centre: "C-STEMP Hub",
        level: "Level 1",
        seats: 40,
        ratePerSeat: 25000,
        subtotal: 1000000,
      },
    ]);
  };

  const handleRemoveAssessment = (id: string) => {
    if (assessmentStreams.length <= 1) {
      toast({
        type: "error",
        title: "At least one stream is required",
        description: "Please keep at least one assessment stream.",
      });
      return;
    }
    setAssessmentStreams((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateAssessment = (
    id: string,
    field: keyof AssessmentStreamItem,
    value: any,
  ) => {
    setAssessmentStreams((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "level") {
          const match = LEVEL_FEE_OPTIONS.find((o) => o.value === value);
          if (match?.price) updated.ratePerSeat = match.price;
        }
        if (field === "seats" || field === "level") {
          const seatsNum =
            field === "seats" ? parseInt(value, 10) || 0 : item.seats;
          updated.seats = seatsNum;
          updated.subtotal = seatsNum * updated.ratePerSeat;
        }
        return updated;
      }),
    );
  };

  // Compute Grand Total
  const trainingTotal =
    programModel === "assessment_only"
      ? 0
      : trainingTracks.reduce((acc, curr) => acc + curr.subtotal, 0);

  const assessmentTotal =
    programModel === "training_only"
      ? 0
      : assessmentStreams.reduce((acc, curr) => acc + curr.subtotal, 0);

  const grandTotal = trainingTotal + assessmentTotal;

  const modelLabel =
    programModel === "training_only"
      ? "Training Only (LMS)"
      : programModel === "assessment_only"
        ? "Assessment Only (NSQ/RPL)"
        : "Combined Dual-Track (Training + Assessment)";

  const handleProceedToReview = () => {
    if (!cohortName.trim()) {
      toast({
        type: "error",
        title: "Cohort Program Name Required",
        description: "Please enter a title for this cohort program.",
      });
      return;
    }
    setIsReviewOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsReviewOpen(false);
    setTimeout(() => {
      setIsPaymentSuccessOpen(true);
    }, 200);
  };

  const handlePaymentSuccessContinue = () => {
    setIsPaymentSuccessOpen(false);
    onSuccess({
      id: `COH-${Date.now().toString().slice(-4)}`,
      name: cohortName,
      model: modelLabel,
      totalCost: grandTotal,
      traineesCount:
        trainingTracks.reduce((acc, t) => acc + t.slots, 0) +
        assessmentStreams.reduce((acc, s) => acc + s.seats, 0),
      createdAt: new Date().toLocaleDateString("en-GB"),
      status: "Ongoing",
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 select-text">
      {/* Red Header Bar (Matching Screenshots 1 & 5) */}
      <div className="w-full bg-[#8F1532] text-white rounded-3xl p-6 sm:p-8 flex flex-col gap-2 shadow-lg">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-white hover:text-white/80 transition-colors cursor-pointer w-fit"
        >
          <FiArrowLeft className="w-6 h-6 stroke-[2.5]" />
          Create Workforce Cohort Request
        </button>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70 font-medium">
          <button
            type="button"
            onClick={onBack}
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </button>
          <span>&gt;</span>
          <span className="text-white">Start Cohort</span>
        </div>
      </div>

      {/* Cohort Metadata Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
        {/* Cohort Program Name */}
        <Input
          label="Cohort Program Name"
          placeholder="Type Here"
          value={cohortName}
          onChange={(e) => setCohortName(e.target.value)}
        />

        {/* Program Model Radio Cards */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-text-dark font-medium text-xs xl:text-sm select-none">
            Program Model
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "training_only", label: "Training Only (LMS)" },
              { id: "assessment_only", label: "Assessment Only (NSQ/RPL)" },
              {
                id: "duo",
                label: "Duo Cohort (Training & Assessment)",
              },
            ].map((option) => {
              const isSelected = programModel === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    setProgramModel(option.id as ProgramModel);
                    if (option.id === "training_only")
                      setActiveTrack("training");
                    if (option.id === "assessment_only")
                      setActiveTrack("assessment");
                  }}
                  className={`h-12 px-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary-solid bg-rose-50/50 text-gray-900 font-semibold"
                      : "border-gray-200 bg-input-bg text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xs sm:text-sm truncate">
                    {option.label}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-[#8F1532]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#8F1532]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pill Track Selector */}
      {programModel === "duo" && (
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 shadow-xs flex items-center gap-3">
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
      )}

      {/* VIEW 1: Training Track (Screenshot 5) */}
      {(programModel === "training_only" ||
        (programModel === "duo" && activeTrack === "training")) && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-neutral-primary">
                Workforce LMS Training Trades &amp; Slots
              </h2>
              <p className="text-xs sm:text-sm text-neutral-secondary mt-0.5">
                Select trades, choose individual levels or complete trade packages with transparent pricing, and allocate slots.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddTrade}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#8F1532] text-[#8F1532] text-xs sm:text-sm font-bold hover:bg-rose-50 transition-colors cursor-pointer w-fit shrink-0"
            >
              <FiPlus className="w-4 h-4" />
              Add More Trades
            </button>
          </div>

          {/* Repeating Trade Cards */}
          <div className="flex flex-col gap-6">
            {trainingTracks.map((item, idx) => (
              <div
                key={item.id}
                className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 text-[#8F1532] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-gray-900">
                      Trade Curriculum #{idx + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveTrade(item.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    Remove Trade
                  </button>
                </div>

                {/* 3 Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Select Trade Curriculum"
                    value={item.trade}
                    options={TRADE_OPTIONS}
                    onChange={(val) => handleUpdateTrade(item.id, "trade", val)}
                  />

                  <Select
                    label="Level & Course Scope"
                    value={item.scope}
                    options={SCOPE_OPTIONS}
                    onChange={(val) => handleUpdateTrade(item.id, "scope", val)}
                  />

                  <Input
                    label="Allocated Slots"
                    type="number"
                    placeholder="Type Here"
                    value={item.slots || ""}
                    onChange={(e) =>
                      handleUpdateTrade(item.id, "slots", e.target.value)
                    }
                  />
                </div>

                {/* Subtotal Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs sm:text-sm font-semibold text-gray-500">
                    Trade Subtotal:
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-gray-900">
                    {formatNaira(item.subtotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            {programModel === "duo" ? (
              <Button
                type="button"
                variant="amber"
                size="lg"
                onClick={() => setActiveTrack("assessment")}
                className="h-12 px-10 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                variant="amber"
                size="lg"
                onClick={handleProceedToReview}
                className="h-12 px-8 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
              >
                Proceed to Review and Payment
              </Button>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: Assessment Track (Screenshot 1) */}
      {(programModel === "assessment_only" ||
        (programModel === "duo" && activeTrack === "assessment")) && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-neutral-primary">
                Competency Assessment Streams (NSQ &amp; RPL)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-secondary mt-0.5">
                Select assessment type, accredited centre, qualification level with attached rates, and candidate seats.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddAssessment}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#8F1532] text-[#8F1532] text-xs sm:text-sm font-bold hover:bg-rose-50 transition-colors cursor-pointer w-fit shrink-0"
            >
              <FiPlus className="w-4 h-4" />
              Add More Assessment
            </button>
          </div>

          {/* Repeating Assessment Cards */}
          <div className="flex flex-col gap-6">
            {assessmentStreams.map((item, idx) => (
              <div
                key={item.id}
                className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 text-[#8F1532] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-gray-900">
                      Assessment Curriculum #{idx + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveAssessment(item.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    Remove Stream
                  </button>
                </div>

                {/* 4 Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Select
                    label="Pathway Type"
                    value={item.pathway}
                    options={PATHWAY_OPTIONS}
                    onChange={(val) =>
                      handleUpdateAssessment(item.id, "pathway", val)
                    }
                  />

                  <Select
                    label="Accredited Assessment Centre"
                    value={item.centre}
                    options={CENTRE_OPTIONS}
                    onChange={(val) =>
                      handleUpdateAssessment(item.id, "centre", val)
                    }
                  />

                  <Select
                    label="Qualification Level & Fee"
                    value={item.level}
                    options={LEVEL_FEE_OPTIONS}
                    onChange={(val) =>
                      handleUpdateAssessment(item.id, "level", val)
                    }
                  />

                  <Input
                    label="Allocated Slots"
                    type="number"
                    placeholder="Type Here"
                    value={item.seats || ""}
                    onChange={(e) =>
                      handleUpdateAssessment(item.id, "seats", e.target.value)
                    }
                  />
                </div>

                {/* Subtotal Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs sm:text-sm font-semibold text-gray-500">
                    Trade Subtotal:
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-gray-900">
                    {formatNaira(item.subtotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total & Proceed Button Footer (Screenshot 1) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                GRAND TOTAL
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {formatNaira(grandTotal)}
              </p>
            </div>

            <Button
              type="button"
              variant="amber"
              size="lg"
              onClick={handleProceedToReview}
              className="h-12 px-8 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
            >
              Proceed to Review and Payment
            </Button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      <CohortReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        cohortName={cohortName}
        programModel={modelLabel}
        trainingTracks={
          programModel === "assessment_only" ? [] : trainingTracks
        }
        assessmentStreams={
          programModel === "training_only" ? [] : assessmentStreams
        }
        totalCost={grandTotal}
        onConfirmPayment={handleConfirmPayment}
      />

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onContinue={handlePaymentSuccessContinue}
      />
    </div>
  );
};
