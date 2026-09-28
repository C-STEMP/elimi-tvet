"use client";

import React, { useState, useEffect } from "react";

export type AuthMode = "login" | "register";
type Platform = "cap" | "lms";

interface PlatformSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function PlatformSelectModal({
  isOpen,
  onClose,
  initialMode = "login",
}: PlatformSelectModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("cap");

  useEffect(() => {
    // Reset selection to cap when opened
    if (isOpen) setSelectedPlatform("cap");
  }, [isOpen]);

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

  const isLogin = initialMode === "login";

  const getDestinationUrl = (platform: Platform) => {
    if (platform === "cap") {
      return isLogin
        ? "https://cap.e-limi.africa/login"
        : "https://cap.e-limi.africa/register";
    }
    return isLogin
      ? "https://training.elimi.africa/login"
      : "https://training.elimi.africa/register";
  };

  const handleContinue = () => {
    window.location.href = getDestinationUrl(selectedPlatform);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Clean White Modal */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white p-8 sm:p-12 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
            Select Your Platform
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            {isLogin ? "Choose which portal to sign in to" : "Choose which portal to register with"}
          </p>
        </div>

        {/* Simple Platform Selection Cards */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* Option 1: ELIMI CAP */}
          <div
            onClick={() => setSelectedPlatform("cap")}
            className="flex w-52 flex-col items-center text-center cursor-pointer group"
          >
            <div
              className={`flex h-32 w-32 sm:h-36 sm:w-36 flex-col items-center justify-center rounded-2xl transition-all duration-200 ${
                selectedPlatform === "cap"
                  ? "bg-white border-2 border-[#661126] shadow-xl shadow-[#661126]/10 scale-105"
                  : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                  selectedPlatform === "cap"
                    ? "text-[#661126]"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <span
              className={`mt-3 text-sm sm:text-base transition-colors ${
                selectedPlatform === "cap"
                  ? "font-bold text-gray-900"
                  : "font-semibold text-gray-500 group-hover:text-gray-700"
              }`}
            >
              CAP (Assessment)
            </span>
            <p className="mt-1 text-xs text-gray-400 leading-snug">
              Trade skills assessment &amp; RPL certification
            </p>
          </div>

          {/* Option 2: ELIMI LMS / Learn */}
          <div
            onClick={() => setSelectedPlatform("lms")}
            className="flex w-52 flex-col items-center text-center cursor-pointer group"
          >
            <div
              className={`flex h-32 w-32 sm:h-36 sm:w-36 flex-col items-center justify-center rounded-2xl transition-all duration-200 ${
                selectedPlatform === "lms"
                  ? "bg-white border-2 border-[#661126] shadow-xl shadow-[#661126]/10 scale-105"
                  : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                  selectedPlatform === "lms"
                    ? "text-[#661126]"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <span
              className={`mt-3 text-sm sm:text-base transition-colors ${
                selectedPlatform === "lms"
                  ? "font-bold text-gray-900"
                  : "font-semibold text-gray-500 group-hover:text-gray-700"
              }`}
            >
              LMS (Learn)
            </span>
            <p className="mt-1 text-xs text-gray-400 leading-snug">
              Vocational trade courses &amp; online learning
            </p>
          </div>
        </div>

        {/* Confirm / Continue Button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            className="cursor-pointer rounded-full bg-[#661126] px-10 py-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase shadow-lg shadow-[#661126]/20 transition-all hover:bg-[#500c1c] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm &amp; Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
