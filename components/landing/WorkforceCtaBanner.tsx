"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthMode } from "./PlatformSelectModal";
import { archiImg } from "@/assets";

interface WorkforceCtaBannerProps {
  onOpenAuthModal?: (mode: AuthMode) => void;
}

export function WorkforceCtaBanner({
  onOpenAuthModal,
}: WorkforceCtaBannerProps) {
  return (
    <section className="relative w-full mt-4">
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#333333] pointer-events-none" />

      <div className="relative z-10 w-full px-2.5 xs:px-3 sm:px-6 lg:px-8 xl:px-15 mx-auto">
        <div
          data-aos="zoom-in"
          data-aos-duration="900"
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[36px] bg-[#1E242B] py-10 sm:py-16 md:py-20 px-3.5 xs:px-5 sm:px-10 lg:px-16 text-center shadow-2xl"
        >
          <Image
            src={archiImg}
            alt="Skilled Workforce"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />

          <div className="absolute inset-0 bg-black/45 z-0" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
              Build A Stronger, More Skilled Workforce
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal max-w-2xl">
              Give your team the skills they need to perform better, adapt
              faster, and grow with your organization. With Elimi, organizations
              can train, assess, and develop their employees through practical,
              job-relevant learning.
            </p>

            {onOpenAuthModal ? (
              <button
                type="button"
                onClick={() => onOpenAuthModal("register")}
                className="mt-6 sm:mt-8 inline-block rounded-xl bg-secondary px-8 sm:px-12 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-secondary-hover transition-all cursor-pointer active:scale-95"
              >
                Get Started
              </button>
            ) : (
              <Link
                href="/gateway?mode=register"
                className="mt-6 sm:mt-8 inline-block rounded-xl bg-secondary px-8 sm:px-12 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-secondary-hover transition-all cursor-pointer"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
