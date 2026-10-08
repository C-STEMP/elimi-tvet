"use client";

import * as React from "react";
import { Logo } from "@/components/ui/logo";
import { FloatingCircles } from "./FloatingCircles";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

export const AuthSidebar: React.FC = () => {
  return (
    <div
      suppressHydrationWarning
      className="hidden lg:flex lg:w-[40%] h-screen sticky top-0 shrink-0 bg-primary-solid flex-col justify-between p-12 xl:p-16 overflow-hidden select-none"
    >
      <FloatingCircles />

      <div
        suppressHydrationWarning
        className="relative z-10 flex flex-col h-full justify-between"
      >
        <div suppressHydrationWarning className="flex flex-col gap-7">
          <div suppressHydrationWarning>
            <Logo theme="light" />
          </div>

          <div suppressHydrationWarning className="flex flex-col gap-6">
            <h2 className="text-neutral-burgundy text-3xl xl:text-[34px] font-bold leading-tight tracking-tight max-w-sm">
              Build a verified career in your trade.
            </h2>
            <p className="text-neutral-burgundy text-sm xl:text-base leading-relaxed max-w-lg font-normal font-work">
              Learn, get NSQ-certified, and get discovered by employers, all
              from one ELIMI account.
            </p>

            <div suppressHydrationWarning className="pt-1">
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                <span className="underline underline-offset-4">Learn More</span>
                <HiOutlineArrowNarrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div suppressHydrationWarning className="w-full">
          <div
            suppressHydrationWarning
            className="w-full h-px bg-white/20 mb-5"
          />
          <blockquote className="text-neutral-burgundy text-sm xl:text-[15px] leading-relaxed mb-3 font-medium max-w-lg">
            &ldquo;ELIMI helped me get NSQ Level 3 certified as a carpenter
            after 9 years on the job — no classroom needed.&rdquo;
          </blockquote>
          <cite className="text-neutral-burgundy text-xs font-semibold tracking-wide not-italic">
            Tunde Balogun · Carpenter, Ibadan
          </cite>
        </div>
      </div>
    </div>
  );
};
