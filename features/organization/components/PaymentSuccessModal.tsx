"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onContinue: () => void;
  title?: string;
  description?: string;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onContinue,
  title = "Payment Successful",
  description = "You have successfully created this cohort program request.",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onContinue();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onContinue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-6 select-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onContinue}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm sm:max-w-md transform overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-2xl transition-all flex flex-col items-center text-center">
        {/* Glowing Green Checkmark Circle */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#55C846] to-[#36A628] flex items-center justify-center shadow-lg shadow-green-500/25 mb-6 ring-8 ring-green-100/70">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[3.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-neutral-secondary text-xs sm:text-sm leading-relaxed mt-2 font-normal max-w-xs">
          {description}
        </p>

        {/* Action Button */}
        <div className="w-full mt-8">
          <Button
            type="button"
            variant="amber"
            size="lg"
            fullWidth
            onClick={onContinue}
            className="h-12 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
