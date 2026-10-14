"use client";

import React from "react";
import { VerificationStatus } from "../types/settings.types";
import { FiCheckCircle, FiShield } from "react-icons/fi";

interface VerificationStatusCardProps {
  status: VerificationStatus;
  onVerifyNow?: () => void;
}

export const VerificationStatusCard: React.FC<VerificationStatusCardProps> = ({
  status,
  onVerifyNow,
}) => {
  const isVerified = status === "verified";

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg lg:text-xl font-extrabold text-neutral-primary">
        Verification Status
      </h2>

      {isVerified ? (
        <div className="bg-[#edf7ee] border border-[#c8e6c9] rounded-xl p-4 flex items-center justify-between transition-all">
          <div className="flex flex-col">
            <span className="font-semibold text-[#2e7d32] text-sm lg:text-base">
              CAC / RC Number Verification
            </span>
            <span className="text-xs text-[#388e3c] mt-0.5">
              Organization Verification Complete
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#2e7d32] font-semibold text-sm">
            <FiCheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Verified</span>
          </div>
        </div>
      ) : (
        <div className="bg-[#fbebee] border border-[#f5c6cb]/60 rounded-xl p-4 flex items-center justify-between transition-all">
          <div className="flex flex-col">
            <span className="font-semibold text-[#B3261E] text-sm lg:text-base">
              CAC / RC Number Verification
            </span>
            <span className="text-xs text-[#B3261E]/80 mt-0.5">
              Not Verified — Upload verification documents
            </span>
          </div>

          <button
            type="button"
            onClick={onVerifyNow}
            className="bg-white text-[#B3261E] hover:bg-[#8F1532] hover:text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer border border-[#B3261E]/20"
          >
            Verify Now
          </button>
        </div>
      )}
    </div>
  );
};
