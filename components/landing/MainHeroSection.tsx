"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiStar } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa";
import { AuthMode } from "./PlatformSelectModal";

interface MainHeroSectionProps {
  onOpenAuthModal?: (mode: AuthMode) => void;
}

export function MainHeroSection({ onOpenAuthModal }: MainHeroSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 sm:pt-6 pb-8">
      {/* Warm Cream Rounded Hero Container */}
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#FFF8F0] border border-[#FEEAD4]/60 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Pitch & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            {/* Top Rating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-xs border border-[#FDE0C2] text-xs font-semibold text-gray-800 select-none">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <HiStar className="w-4 h-4 text-amber-500" />
                4.9
              </span>
              <span className="text-gray-400 font-normal">
                (5k+ happy learners)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#1E1E1E] tracking-tight leading-[1.12]">
              Unlock Skills That <br className="hidden sm:inline" />
              Will Shape Your <br className="hidden sm:inline" />
              Future
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-normal max-w-lg">
              Build practical skills, monitor your abilities, earn certifications,
              and receive job opportunities, all in one platform designed to
              help you take the next step in your career.
            </p>

            {/* Action Button */}
            <div className="pt-2">
              {onOpenAuthModal ? (
                <button
                  type="button"
                  onClick={() => onOpenAuthModal("register")}
                  className="inline-block rounded-xl bg-secondary px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer active:scale-95"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  href="/gateway?mode=register"
                  className="inline-block rounded-xl bg-secondary px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: 3-Image Collage */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-lg">
              {/* Left Column of collage: Yellow Card + Burgundy Card */}
              <div className="flex flex-col gap-3.5 sm:gap-4">
                {/* Yellow Card: African worker with hard hat */}
                <div className="relative h-44 sm:h-52 rounded-2xl bg-[#FBB040] overflow-hidden p-2 flex items-end justify-center shadow-sm group">
                  {/* Decorative spark badge */}
                  <div className="absolute top-2.5 right-2.5 h-4 w-4 rounded-full bg-[#E04B4B] flex items-center justify-center text-[9px] text-white font-bold">
                    ✦
                  </div>
                  <div className="relative w-full h-[90%] overflow-hidden rounded-xl">
                    <Image
                      src="/images/user_avatar_chidi.jpg"
                      alt="Learner"
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="200px"
                    />
                  </div>
                </div>

                {/* Burgundy Card: Trainee at laptop with floating courses badge */}
                <div className="relative h-40 sm:h-48 rounded-2xl bg-[#75152B] overflow-hidden p-2 shadow-sm group">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/facilitator_ngozi.jpg"
                      alt="Trainee with laptop"
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="200px"
                    />
                  </div>
                  {/* Floating 20+ Courses Badge */}
                  <div className="absolute bottom-3 right-3 bg-secondary text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1.5 select-none">
                    <FaGraduationCap className="w-3 h-3" />
                    <span>20+ Courses</span>
                  </div>
                </div>
              </div>

              {/* Right Column of collage: Tall Card with construction workers */}
              <div className="relative h-[340px] sm:h-[432px] rounded-2xl bg-[#2D3339] overflow-hidden shadow-sm group">
                <Image
                  src="/hero-img-2.jpg"
                  alt="Certified Construction Workers"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  sizes="250px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
