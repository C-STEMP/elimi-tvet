"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ASSETS_URL } from "@/assets";
import { PasswordRequirements } from "@/components/ui/password-requirements";
import { FaApple } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { clearTokens, saveOnboardedStatus } from "@/lib/auth-storage";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validation";
import { GoogleLogin } from "@react-oauth/google";
import { useRegister, useGoogleAuth } from "@/features/auth/hooks/useAuth";

export const SignUpEmail: React.FC = () => {
  useEffect(() => {
    clearTokens();
    saveOnboardedStatus(false);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { toast } = useToast();
  const { mutate: registerUser, isPending } = useRegister();
  const { handleGoogleSuccess, handleGoogleError, isPending: isGooglePending } =
    useGoogleAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    if (emailErr || passErr || confirmErr) {
      setErrors({
        email: emailErr || undefined,
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
    registerUser({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[440px] mx-auto flex flex-col justify-center select-text"
    >
      <div className="mb-6 text-center lg:text-left w-full flex flex-col items-center lg:items-start">
        <h1 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-neutral-primary text-center lg:text-left">
          Create your account
        </h1>
        <p className="text-neutral-secondary text-[14px] xl:text-[15px] leading-relaxed mt-1 max-w-sm font-normal text-center lg:text-left mx-auto lg:mx-0">
          Join institutions building verified TVET excellence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          label={
            <span>
              Email Address<span className="text-primary-solid ml-0.5">*</span>
            </span>
          }
          type="email"
          name="email"
          placeholder="yourname@organization.com"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          disabled={isPending}
        />

        <div className="w-full flex flex-col">
          <Input
            label={
              <span>
                Password<span className="text-primary-solid ml-0.5">*</span>
              </span>
            }
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
            disabled={isPending}
          />
          <PasswordRequirements password={password} />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Input
            label={
              <span>
                Confirm Password
                <span className="text-primary-solid ml-0.5">*</span>
              </span>
            }
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
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }
            }}
            disabled={isPending}
          />
        </div>

        <div className="w-full mt-2">
          <Button
            type="submit"
            variant="amber"
            size="lg"
            className="w-full h-12 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
            loading={isPending}
          >
            Create Account
          </Button>
        </div>

        <div className="w-full flex items-center gap-4 my-2 select-none">
          <div className="flex-1 h-px bg-border-gray/70" />
          <span className="text-neutral-secondary text-xs font-normal">or</span>
          <div className="flex-1 h-px bg-border-gray/70" />
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="relative w-full overflow-hidden rounded-xl">
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isPending || isGooglePending}
              leftIcon={
                <Image
                  src={ASSETS_URL.googleIcon}
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              }
              className="w-full h-12 text-text-dark font-medium text-sm xl:text-base cursor-pointer rounded-xl"
            >
              {isGooglePending ? "Connecting to Google..." : "Continue with Google"}
            </Button>
            <div className="absolute inset-0 opacity-0 overflow-hidden cursor-pointer [&>div]:!w-full [&>div>iframe]:!w-full [&>div>iframe]:!h-full [&>div>iframe]:!scale-150">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                width={400}
                shape="rectangular"
                size="large"
              />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() =>
              toast({
                type: "info",
                title: "Apple Sign-In",
                description: "Connecting to Apple Authentication...",
              })
            }
            disabled={isPending}
            leftIcon={<FaApple className="w-4 h-4 sm:w-5 sm:h-5 text-black" />}
            className="w-full h-12 text-text-dark font-medium text-sm xl:text-base cursor-pointer rounded-xl"
          >
            Continue with Apple
          </Button>
        </div>

        <div className="w-full text-center mt-3 text-sm select-none">
          <span className="text-neutral-secondary font-normal">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="text-primary-solid font-bold ml-1 hover:text-primary-hover transition-colors"
          >
            Login
          </Link>
        </div>
      </form>
    </motion.div>
  );
};
