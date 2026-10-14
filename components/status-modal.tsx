"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ASSETS_URL } from "@/assets";
import { ErrorCircleIcon } from "./ui/svg-icons";

interface StatusModalProps {
  isOpen: boolean;
  onClose?: () => void;
  type?: "success" | "error";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  customIcon?: React.ReactNode;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type = "success",
  title = "Success",
  description = "",
  actionLabel = "Continue",
  onAction,
  customIcon,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[420px] transform overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-2xl transition-all flex flex-col items-center text-center">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Icon */}
        <div className="mt-2 flex items-center justify-center w-24 h-24 mx-auto shrink-0 relative">
          {customIcon ? (
            customIcon
          ) : type === "success" ? (
            <Image
              src={ASSETS_URL.successCheckmarkImg}
              alt="Success"
              width={96}
              height={96}
              className="w-24 h-24 object-contain shrink-0"
              priority
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-red-50 rounded-full border-4 border-red-100 shadow-md">
              <ErrorCircleIcon />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary mt-6 tracking-tight">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-neutral-secondary text-xs sm:text-[14px] leading-relaxed mt-2 font-normal max-w-72">
            {description}
          </p>
        )}

        {/* Action Button */}
        {(onAction || onClose) && (
          <Button
            onClick={onAction || onClose}
            variant="amber"
            size="lg"
            fullWidth
            className="h-12 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] mt-8 transition-all shadow-md cursor-pointer rounded-xl"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
