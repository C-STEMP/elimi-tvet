"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ASSETS_URL } from "@/assets";
import { PasswordRequirements } from "@/components/ui/password-requirements";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SecurityFormData } from "../types/settings.types";
import { useToast } from "@/components/ui/toast";

interface ChangePasswordSectionProps {
  formData: SecurityFormData;
  onChange: (field: keyof SecurityFormData, value: string) => void;
  onSubmit: () => void;
}

export const ChangePasswordSection: React.FC<ChangePasswordSectionProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ confirm?: string }>({});
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }
    if (!formData.currentPassword || !formData.newPassword) {
      toast({
        type: "error",
        title: "Required Fields",
        description: "Please fill in all password fields.",
      });
      return;
    }
    setErrors({});
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      onSubmit();
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-lg lg:text-xl font-extrabold text-neutral-primary">
        Change Password
      </h2>

      <div className="flex flex-col gap-4">
        {/* Current Password */}
        <Input
          label="Current Password"
          type={showCurrent ? "text" : "password"}
          value={formData.currentPassword}
          onChange={(e) => onChange("currentPassword", e.target.value)}
          placeholder="•••••••••"
          suffix={
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              aria-label="Toggle password visibility"
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showCurrent ? (
                <FiEye className="w-5 h-5 text-neutral-700" />
              ) : (
                <FiEyeOff className="w-5 h-5 text-neutral-400" />
              )}
            </button>
          }
        />

        {/* New Password */}
        <div className="w-full flex flex-col">
          <Input
            label="New Password"
            type={showNew ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => onChange("newPassword", e.target.value)}
            placeholder="•••••••••"
            suffix={
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                aria-label="Toggle new password visibility"
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showNew ? (
                  <FiEye className="w-5 h-5 text-neutral-700" />
                ) : (
                  <FiEyeOff className="w-5 h-5 text-neutral-400" />
                )}
              </button>
            }
          />
          <PasswordRequirements password={formData.newPassword} />
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={formData.confirmPassword}
          error={
            formData.confirmPassword &&
            formData.newPassword &&
            formData.confirmPassword !== formData.newPassword
              ? "Passwords do not match"
              : errors.confirm
          }
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          placeholder="•••••••••"
          suffix={
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label="Toggle confirm password visibility"
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showConfirm ? (
                <FiEye className="w-5 h-5 text-neutral-700" />
              ) : (
                <FiEyeOff className="w-5 h-5 text-neutral-400" />
              )}
            </button>
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-3">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#f9a825] hover:bg-[#e0931b] active:scale-95 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2.5 shadow-md transition-all cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{isPending ? "Saving..." : "Change Password"}</span>
          <Image
            src={ASSETS_URL.saveIcon}
            alt="Save"
            width={18}
            height={18}
            className="brightness-0 invert"
          />
        </button>
      </div>
    </form>
  );
};
