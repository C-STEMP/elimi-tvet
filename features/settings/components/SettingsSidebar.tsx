"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { SettingsTab } from "../types/settings.types";
import { ASSETS_URL } from "@/assets";

interface SettingsSidebarProps {
  logoSrc: string | null;
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  onOpenDeleteModal: () => void;
  onLogoChange?: (file: File) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  logoSrc,
  activeTab,
  onTabChange,
  onOpenDeleteModal,
  onLogoChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onLogoChange) {
      onLogoChange(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100 flex flex-col gap-6 w-full lg:w-72 shrink-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top Organization Brand Card */}
      <div className="flex items-center gap-3.5">
        <div className="w-20 h-20 rounded-2xl bg-[#F9ECEF] border border-rose-100/60 flex items-center justify-center p-2 shrink-0 overflow-hidden relative">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Organization Logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              src={ASSETS_URL.cstempLogo}
              alt="C-STEMP Logo"
              width={70}
              height={70}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="flex flex-col items-start justify-center gap-1.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#8F1532] hover:bg-[#721328] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Change logo
          </button>
          <span className="text-[10px] text-gray-400 font-medium">
            JPG or PNG 10mb
          </span>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1E7F4C] mt-0.5">
            <FiCheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Verified</span>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={() => onTabChange("profile")}
          className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-[#FBE8ED] text-neutral-900 font-bold"
              : "text-neutral-700 font-medium hover:bg-gray-50"
          }`}
        >
          Organization Information
        </button>

        <button
          type="button"
          onClick={() => onTabChange("security")}
          className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
            activeTab === "security"
              ? "bg-[#FBE8ED] text-neutral-900 font-bold"
              : "text-neutral-700 font-medium hover:bg-gray-50"
          }`}
        >
          Security
        </button>

        <div className="pt-1">
          <button
            type="button"
            onClick={onOpenDeleteModal}
            className="w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold text-[#B3261E] hover:bg-red-50 transition-all cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </nav>
    </div>
  );
};
