"use client";

import Image from "next/image";
import Link from "next/link";
import { HiStar } from "react-icons/hi";
import { heroImg1, heroImg2, heroImg3 } from "@/assets";
import { AuthMode } from "./PlatformSelectModal";

interface MainHeroSectionProps {
  onOpenAuthModal?: (mode: AuthMode) => void;
}

export function MainHeroSection({ onOpenAuthModal }: MainHeroSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto pt-4 sm:pt-6 pb-8">
      {/* Warm Cream Rounded Hero Container */}
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#FEEED3] border border-[#FEEAD4]/60 p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-8">
          {/* Left Column: Pitch & CTA */}
          <div className="w-full xl:max-w-122.5 flex flex-col items-start space-y-5 sm:space-y-6 shrink-0">
            {/* Top Rating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-xs border border-[#FDE0C2] text-xs font-semibold text-gray-800 select-none">
              <Image
                src="/images/hero_avatars.png"
                alt="Happy Learners"
                width={47}
                height={24}
                className="h-5 sm:h-6 w-auto object-contain shrink-0"
                priority
              />
              <div className="flex items-center gap-1">
                <HiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-gray-900">5.0</span>
                <span className="text-gray-500 font-normal">
                  (2k+ Happy Learners)
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-text-dark tracking-tight leading-[1.12]">
              Unlock Skills That <br className="hidden sm:inline" />
              Will Shape Your <br className="hidden sm:inline" />
              Future
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-normal max-w-lg">
              Build your skills, assess your abilities, earn certificates, and
              explore job opportunities, all on one platform designed to help
              you take the next step in your career
            </p>

            {/* Action Button */}
            <div className="pt-2">
              {onOpenAuthModal ? (
                <button
                  type="button"
                  onClick={() => onOpenAuthModal("register")}
                  className="inline-block rounded-xl bg-secondary px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer active:scale-95"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  href="/gateway?mode=register"
                  className="inline-block rounded-xl bg-secondary px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: 3-Image Collage matching Figma */}
          <div className="w-full xl:w-auto flex items-center justify-center xl:justify-end overflow-visible pt-4 xl:pt-0">
            <div className="relative flex items-center gap-4 sm:gap-6 shrink-0 scale-[0.62] xs:scale-[0.72] sm:scale-[0.85] md:scale-95 lg:scale-90 xl:scale-100 origin-center xl:origin-right -my-15 xs:my-[-40px] sm:-my-5 md:my-0">
              {/* Left Sub-Column (Technician card on top, Trainee & 2k+ Courses card below) */}
              <div className="flex flex-col gap-4 sm:gap-6 items-end">
                {/* 1. Yellow Technician Card */}
                <div className="relative w-69 h-69 shrink-0">
                  <Image
                    src={heroImg1}
                    alt="Skilled technician"
                    fill
                    priority
                    className="object-contain"
                  />
                  {/* Play Icon Badge overlapping corner */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#85152F] flex items-center justify-center shadow-xs select-none z-20">
                    <svg
                      className="w-2.5 h-2.5 text-white translate-x-[0.5px]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* 2. Burgundy Trainee & 2k+ Courses Card */}
                <div className="relative w-95.25 h-52.5 shrink-0">
                  <Image
                    src={heroImg3}
                    alt="Trainee with laptop and courses badge"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Sub-Column: Construction Workers Card */}
              <div className="relative w-69 h-86.75 rounded-2xl overflow-hidden shrink-0 self-center shadow-xs">
                <Image
                  src={heroImg2}
                  alt="Certified construction workers"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
