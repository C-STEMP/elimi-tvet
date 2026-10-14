"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { PasswordRequirements } from "@/components/ui/password-requirements";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusModal } from "@/components/status-modal";
import { motion } from "framer-motion";
import {
  validateRequired,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validation";

export const CompleteSignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@organization.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateRequired(fullName, "Full name");
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    if (nameErr || passErr || confirmErr) {
      setErrors({
        fullName: nameErr || undefined,
        password: passErr || undefined,
        confirmPassword: confirmErr || undefined,
      });
      toast({
        type: "error",
        title: "Validation Error",
        description: "Please check the highlighted fields below.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px] mx-auto flex flex-col justify-center select-text"
      >
        <div className="mb-8 text-center lg:text-left w-full flex flex-col items-center lg:items-start">
          <h1 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-neutral-primary text-center lg:text-left">
            Complete Account Setup
          </h1>
          <p className="text-neutral-secondary text-[14px] xl:text-[15px] leading-relaxed mt-2 max-w-sm font-normal text-center lg:text-left mx-auto lg:mx-0">
            Complete your profile registration for{" "}
            <span className="font-semibold text-text-dark">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="e.g. Dr. Ngozi Okafor"
            value={fullName}
            error={errors.fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName)
                setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            disabled={isSubmitting}
          />

          <div className="w-full flex flex-col">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••••••"
              value={password}
              error={errors.password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
                if (confirmPassword) {
                  if (val !== confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "Passwords do not match",
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }
                }
              }}
              disabled={isSubmitting}
            />
            <PasswordRequirements password={password} />
          </div>

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••••••"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              setConfirmPassword(val);
              if (val && password && val !== password) {
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: "Passwords do not match",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: undefined,
                }));
              }
            }}
            disabled={isSubmitting}
          />

          <div className="w-full mt-2">
            <Button
              type="submit"
              variant="amber"
              size="lg"
              className="w-full h-12 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
              loading={isSubmitting}
            >
              Complete Registration
            </Button>
          </div>
        </form>
      </motion.div>

      <StatusModal
        isOpen={showSuccessModal}
        title="Account Ready!"
        description="Your profile setup is complete. Let's get your institution onboarded."
        actionLabel="Continue to Onboarding"
        onAction={() => router.push("/onboarding")}
      />
    </>
  );
};
