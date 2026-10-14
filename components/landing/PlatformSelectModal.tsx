"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineBriefcase,
  HiOutlineOfficeBuilding,
  HiOutlineArrowNarrowRight,
  HiX,
} from "react-icons/hi";

export type AuthMode = "login" | "register";
type Platform = "organization" | "cap" | "lms" | "workmasters";

interface PlatformSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

interface PlatformOption {
  id: Platform;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PLATFORMS: PlatformOption[] = [
  {
    id: "lms",
    title: "Skills Training",
    badge: "LMS",
    description: "Vocational trade courses & self-paced learning",
    icon: HiOutlineAcademicCap,
  },
  {
    id: "cap",
    title: "Assessment",
    badge: "CAP",
    description: "Trade skills assessment, testing & RPL certification",
    icon: HiOutlineBadgeCheck,
  },
  {
    id: "workmasters",
    title: "Workmasters",
    badge: "Jobs",
    description: "Verified trade professional marketplace & hiring",
    icon: HiOutlineBriefcase,
  },
  {
    id: "organization",
    title: "Organization",
    badge: "TVET",
    description: "Institutional portal, cohorts & enterprise management",
    icon: HiOutlineOfficeBuilding,
  },
];

export function PlatformSelectModal({
  isOpen,
  onClose,
  initialMode = "login",
}: PlatformSelectModalProps) {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("organization");

  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
    }
  }, [isOpen, initialMode]);

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

  const isLogin = authMode === "login";

  const handleProceed = (platform: Platform = selectedPlatform) => {
    onClose();
    if (platform === "organization") {
      router.push(isLogin ? "/login" : "/register");
      return;
    }

    if (platform === "cap") {
      window.location.href = isLogin
        ? "https://cap.e-limi.africa/login"
        : "https://cap.e-limi.africa/register";
      return;
    }

    if (platform === "lms") {
      window.location.href = isLogin
        ? "https://training.elimi.africa/login"
        : "https://training.elimi.africa/register";
      return;
    }

    if (platform === "workmasters") {
      window.location.href = isLogin
        ? "https://workmasters.elimi.africa/login"
        : "https://workmasters.elimi.africa/register";
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-6 sm:p-9 shadow-2xl transition-all border border-gray-100 my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <HiX className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-2">
          {/* Auth Mode Toggle Pill */}
          <div className="inline-flex items-center rounded-full bg-gray-100 p-1 mb-3">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1E1E1E]">
            {isLogin ? "Sign in to ELIMI" : "Join the ELIMI Ecosystem"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            {isLogin
              ? "Select the platform you want to sign in to:"
              : "Select the platform you want to register with:"}
          </p>
        </div>

        {/* 4 Platform Selection Cards (2x2 Grid) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatform === platform.id;

            return (
              <div
                key={platform.id}
                onClick={() => {
                  setSelectedPlatform(platform.id);
                }}
                onDoubleClick={() => handleProceed(platform.id)}
                className={`relative flex flex-col p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 border text-left ${
                  isSelected
                    ? "bg-[#FFF8F0] border-[#F9A825] shadow-md shadow-[#F9A825]/10 scale-[1.01]"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/70"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? "bg-[#F9A825] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-[#F9A825]/20 text-[#B7791F]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {platform.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3
                    className={`text-base font-bold transition-colors ${
                      isSelected ? "text-[#1E1E1E]" : "text-gray-800"
                    }`}
                  >
                    {platform.title}
                  </h3>
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#F9A825] bg-[#F9A825]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                <p className="mt-1 text-xs text-gray-500 leading-snug">
                  {platform.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Proceed Action Button */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            Double-click any card or click proceed below.
          </p>

          <button
            type="button"
            onClick={() => handleProceed()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-secondary px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all active:scale-[0.98]"
          >
            <span>Proceed to {isLogin ? "Sign In" : "Register"}</span>
            <HiOutlineArrowNarrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
