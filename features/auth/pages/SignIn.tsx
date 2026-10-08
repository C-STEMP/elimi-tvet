"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ASSETS_URL } from "@/assets";
import { FaApple } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { validateEmail } from "@/lib/validation";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin, useGoogleAuth } from "@/features/auth/hooks/useAuth";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { toast } = useToast();
  const { mutate: loginUser, isPending: isLoggingIn } = useLogin();
  const { handleGoogleSuccess, handleGoogleError, isPending: isGooglePending } =
    useGoogleAuth();

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passErr = !password.trim() ? "Password is required" : null;

    if (emailErr || passErr) {
      setErrors({
        email: emailErr || undefined,
        password: passErr || undefined,
      });
      toast({
        type: "error",
        title: "Input Required",
        description: "Please check the highlighted fields.",
      });
      return;
    }

    setErrors({});
    loginUser({ email, password });
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
          Welcome back
        </h1>
        <p className="text-neutral-secondary text-[14px] xl:text-[15px] leading-relaxed mt-1 max-w-sm font-normal text-center lg:text-left mx-auto lg:mx-0">
          Sign in to your ELIMI TVET and organization account.
        </p>
      </div>

      <form onSubmit={handleSignInSubmit} className="w-full flex flex-col gap-4">
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
          disabled={isLoggingIn}
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
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            disabled={isLoggingIn}
          />
        </div>

        <div className="w-full flex justify-end -mt-1 select-none">
          <Link
            href="/forgot-password"
            className="text-primary-solid font-bold text-xs xl:text-sm hover:text-primary-hover transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="w-full mt-2">
          <Button
            type="submit"
            variant="amber"
            size="lg"
            className="w-full h-12 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
            loading={isLoggingIn}
          >
            Sign In
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
              disabled={isLoggingIn || isGooglePending}
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
            disabled={isLoggingIn}
            leftIcon={<FaApple className="w-4 h-4 sm:w-5 sm:h-5 text-black" />}
            className="w-full h-12 text-text-dark font-medium text-sm xl:text-base cursor-pointer rounded-xl"
          >
            Continue with Apple
          </Button>
        </div>

        <div className="w-full text-center mt-3 text-sm select-none">
          <span className="text-neutral-secondary font-normal">
            Don&apos;t have an account?
          </span>
          <Link
            href="/register"
            className="text-primary-solid font-bold ml-1 hover:text-primary-hover transition-colors"
          >
            Register
          </Link>
        </div>
      </form>
    </motion.div>
  );
};
