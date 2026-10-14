"use client";

import React from "react";
import Image from "next/image";
import { ASSETS_URL } from "@/assets";
import { FiCheck } from "react-icons/fi";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Congratulations",
  message = "Your Password has been changed successfully",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6 w-24 h-24 flex items-center justify-center mx-auto">
          {ASSETS_URL.successCheckmarkImg ? (
            <Image
              src={ASSETS_URL.successCheckmarkImg}
              alt="Success"
              width={100}
              height={100}
              className="w-24 h-24 object-contain drop-shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg ring-4 ring-emerald-100">
              <FiCheck className="w-12 h-12 text-white stroke-[3]" />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-neutral-primary mb-2">{title}</h3>
        <p className="text-sm text-neutral-secondary mb-6 leading-relaxed">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="bg-[#f9a825] hover:bg-[#e0931b] active:scale-98 text-white font-bold w-full py-3.5 rounded-xl shadow-md transition-all text-sm cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
