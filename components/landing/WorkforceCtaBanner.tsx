"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthMode } from "./PlatformSelectModal";

interface WorkforceCtaBannerProps {
  onOpenAuthModal?: (mode: AuthMode) => void;
}

export function WorkforceCtaBanner({ onOpenAuthModal }: WorkforceCtaBannerProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-14 sm:pb-20">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#1E242B] py-14 sm:py-20 px-6 sm:px-12 lg:px-20 text-center shadow-xl">
        <Image
          src="/landing-img-1.jpg"
          alt="Skilled Workforce"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/75 to-black/85 z-0" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight">
            Build A Stronger, More Skilled Workforce
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal max-w-2xl">
            Give your team the skills they need to perform better, adapt faster,
            and grow with your organization. With Elimi, organizations can
            train, assess, and develop their employees through practical,
            job-relevant learning.
          </p>

          {onOpenAuthModal ? (
            <button
              type="button"
              onClick={() => onOpenAuthModal("register")}
              className="mt-8 inline-block rounded-xl bg-secondary px-8 sm:px-12 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-secondary-hover transition-all cursor-pointer active:scale-95"
            >
              Get Started
            </button>
          ) : (
            <Link
              href="/gateway?mode=register"
              className="mt-8 inline-block rounded-xl bg-secondary px-8 sm:px-12 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-secondary-hover transition-all cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
