"use client";

import React from "react";
import Image from "next/image";
import { ASSETS_URL } from "@/assets";
import { OrganizationSettingsFormData } from "../types/settings.types";
import { Button } from "@/components/ui/button";

interface OrganizationInfoTabProps {
  formData: OrganizationSettingsFormData;
  onChange: (field: keyof OrganizationSettingsFormData, value: any) => void;
  onSave: () => void;
  isSaving?: boolean;
}

export const OrganizationInfoTab: React.FC<OrganizationInfoTabProps> = ({
  formData,
  onChange,
  onSave,
  isSaving = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 flex flex-col gap-8 w-full"
    >
      {/* SECTION 1: Organization Details */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
          Organization Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Organization Name
            </label>
            <input
              type="text"
              value={formData.organizationName}
              onChange={(e) => onChange("organizationName", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Organization Type
            </label>
            <input
              type="text"
              value={formData.organizationType}
              onChange={(e) => onChange("organizationType", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Industry / Sector
            </label>
            <input
              type="text"
              value={formData.industrySector}
              onChange={(e) => onChange("industrySector", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Website(optional)
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => onChange("website", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Primary Contact */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
          Primary Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Email Address
            </label>
            <input
              type="email"
              value={formData.emailAddress}
              onChange={(e) => onChange("emailAddress", e.target.value)}
              placeholder="Select"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Official Position / Title
            </label>
            <input
              type="text"
              value={formData.officialPosition}
              onChange={(e) => onChange("officialPosition", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Official Email Address
            </label>
            <input
              type="email"
              value={formData.officialEmailAddress}
              onChange={(e) => onChange("officialEmailAddress", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              placeholder="Type here"
              className="w-full bg-[#F8F9FA] border border-gray-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-primary outline-none focus:border-[#8F1532]/40 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Notification Preference */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
          Notification Preference
        </h2>

        <div className="flex flex-col gap-3">
          {/* In App Notifications */}
          <div className="bg-[#F8F9FA] border border-gray-100 rounded-2xl p-4 flex items-center justify-between transition-colors">
            <div className="flex flex-col">
              <span className="font-bold text-neutral-primary text-sm">
                In App Notifications
              </span>
              <span className="text-xs text-neutral-secondary mt-0.5">
                Receive notification in app
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.inAppNotifications}
              onClick={() =>
                onChange("inAppNotifications", !formData.inAppNotifications)
              }
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.inAppNotifications ? "bg-[#8F1532]" : "bg-[#FBE8ED]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  formData.inAppNotifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Email Notifications */}
          <div className="bg-[#F8F9FA] border border-gray-100 rounded-2xl p-4 flex items-center justify-between transition-colors">
            <div className="flex flex-col">
              <span className="font-bold text-neutral-primary text-sm">
                Email Notifications
              </span>
              <span className="text-xs text-neutral-secondary mt-0.5">
                Receive notification via email
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.emailNotifications}
              onClick={() =>
                onChange("emailNotifications", !formData.emailNotifications)
              }
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.emailNotifications ? "bg-[#8F1532]" : "bg-[#FBE8ED]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  formData.emailNotifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Session Reminders */}
          <div className="bg-[#F8F9FA] border border-gray-100 rounded-2xl p-4 flex items-center justify-between transition-colors">
            <div className="flex flex-col">
              <span className="font-bold text-neutral-primary text-sm">
                Session Reminders
              </span>
              <span className="text-xs text-neutral-secondary mt-0.5">
                24h and 1h before sessions
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.sessionReminders}
              onClick={() =>
                onChange("sessionReminders", !formData.sessionReminders)
              }
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.sessionReminders ? "bg-[#8F1532]" : "bg-[#E6CCD3]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  formData.sessionReminders ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-[#f9a825] hover:bg-[#e0931b] active:scale-95 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2.5 shadow-md transition-all cursor-pointer text-sm"
        >
          <span>{isSaving ? "Saving..." : "Save"}</span>
          <Image
            src={ASSETS_URL.saveIcon}
            alt="Save"
            width={18}
            height={18}
            className="brightness-0 invert"
          />
        </Button>
      </div>
    </form>
  );
};
