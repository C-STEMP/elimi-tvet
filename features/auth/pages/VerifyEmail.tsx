"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { StatusModal } from "@/components/status-modal";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useVerifyAccount, useResendOtp } from "@/features/auth/hooks/useAuth";

export const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: verifyCode, isPending: isVerifying } = useVerifyAccount();
  const { mutate: resendCode, isPending: isResending } = useResendOtp();

  const rawEmail = searchParams.get("email") || "user@organization.com";
  const purposeParam = searchParams.get("purpose") || searchParams.get("mode");
  const isPasswordReset =
    purposeParam === "password_reset" || purposeParam === "reset";

  const maskEmail = (emailStr: string) => {
    if (!emailStr) return "user*****@organization.com";
    const parts = emailStr.split("@");
    if (parts.length !== 2) return emailStr;
    const [name, domain] = parts;
    const prefix = name.slice(0, Math.min(4, name.length));
    return `${prefix}*****@${domain}`;
  };

  const formattedEmail = maskEmail(rawEmail);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);

    if (val && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pastedData) {
      const newCode = [...code];
      for (let i = 0; i < 4; i++) {
        newCode[i] = pastedData[i] || "";
      }
      setCode(newCode);

      const nextFocusIndex = Math.min(pastedData.length, 3);
      inputsRef.current[nextFocusIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (isResending || timeLeft > 0) return;
    const purpose = isPasswordReset ? "password_reset" : "account_verify";
    resendCode(
      { email: rawEmail, purpose },
      {
        onSuccess: () => {
          setTimeLeft(60);
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length < 4) {
      toast({
        type: "error",
        title: "Incomplete Code",
        description: "Please enter the complete 4-digit verification code.",
      });
      return;
    }

    if (isPasswordReset) {
      router.push(
        `/change-password?email=${encodeURIComponent(rawEmail)}&otp=${encodeURIComponent(fullCode)}&mode=reset`,
      );
      return;
    }

    verifyCode(
      { email: rawEmail, otp: fullCode },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
        onError: () => {
          setCode(["", "", "", ""]);
          setTimeout(() => inputsRef.current[0]?.focus(), 50);
        },
      },
    );
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        router.push("/onboarding");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, router]);

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
            Verify your email
          </h1>
          <p className="text-neutral-secondary text-[14px] xl:text-[15px] leading-relaxed mt-2 max-w-sm font-normal text-center lg:text-left mx-auto lg:mx-0">
            We sent a 4-digit verification code to{" "}
            <span className="font-semibold text-text-dark">{formattedEmail}</span>.
            Please enter it below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isVerifying}
                className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-[#f5f6fa] border border-transparent rounded-2xl focus:border-primary-solid/50 focus:ring-4 focus:ring-primary-solid/10 outline-none transition-all shadow-inner"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm px-1">
            <span className="text-neutral-secondary">
              Didn&apos;t receive code?
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className={`font-semibold transition-colors cursor-pointer ${
                timeLeft > 0 || isResending
                  ? "text-neutral-secondary cursor-not-allowed opacity-70"
                  : "text-primary-solid hover:text-primary-hover"
              }`}
            >
              {timeLeft > 0
                ? `Resend in ${timeLeft}s`
                : isResending
                  ? "Resending..."
                  : "Resend Code"}
            </button>
          </div>

          <div className="w-full mt-2">
            <Button
              type="submit"
              variant="amber"
              size="lg"
              className="w-full h-12 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
              loading={isVerifying}
            >
              Verify Code
            </Button>
          </div>
        </form>
      </motion.div>

      <StatusModal
        isOpen={showSuccessModal}
        title="Email Verified!"
        description="Your email has been verified. Redirecting you to onboarding..."
        type="success"
      />
    </>
  );
};
