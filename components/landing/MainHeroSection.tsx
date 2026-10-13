"use client";

import Image from "next/image";
import Link from "next/link";
import { TiStarFullOutline } from "react-icons/ti";
import {
  heroImg1,
  heroImg2,
  heroAvatar1,
  heroAvatar2,
  heroAvatar3,
  womanOnSystem,
  playIcon,
} from "@/assets";
import { AuthMode } from "./PlatformSelectModal";

interface MainHeroSectionProps {
  onOpenAuthModal?: (mode: AuthMode) => void;
}

export function MainHeroSection({ onOpenAuthModal }: MainHeroSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto pt-4 sm:pt-6 pb-8">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#FEEED3] border border-[#FEEAD4]/60 p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-8">
          <div className="w-full xl:max-w-122.5 flex flex-col items-start space-y-5 sm:space-y-6 shrink-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-xs border border-[#FDE0C2] text-xs font-semibold text-gray-800 select-none">
              <div className="flex items-center -space-x-1.5">
                <Image
                  src={heroAvatar3}
                  alt="Happy Learner"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover shrink-0 border border-white"
                  priority
                />
                <Image
                  src={heroAvatar1}
                  alt="Happy Learner"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover shrink-0 border border-white"
                  priority
                />
                <Image
                  src={heroAvatar2}
                  alt="Happy Learner"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover shrink-0 border border-white"
                  priority
                />
              </div>

              <div className="flex items-center gap-1">
                <TiStarFullOutline className="w-3.5 h-3.5 text-secondary fill-amber-500" />
                <span className="font-medium text-sm text-[#333333]">5.0</span>
                <span className="text-[#333333] text-sm font-medium">
                  (2k+ Happy Learners)
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-text-dark tracking-tight leading-[1.12]">
              Unlock Skills That <br className="hidden sm:inline" />
              Will Shape Your <br className="hidden sm:inline" />
              Future
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#333333] leading-relaxed font-medium max-w-lg">
              Build your skills, assess your abilities, earn certificates, and
              explore job opportunities, all on one platform designed to help
              you take the next step in your career
            </p>

            <div className="pt-2">
              {onOpenAuthModal ? (
                <button
                  type="button"
                  onClick={() => onOpenAuthModal("register")}
                  className="inline-block rounded-xl bg-secondary px-8 sm:px-10 py-3.5 sm:py-4 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer active:scale-95"
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

          <div className="w-full xl:w-auto flex items-center justify-center xl:justify-end overflow-visible pt-4 xl:pt-0">
            <div className="relative flex items-center gap-4 sm:gap-6 shrink-0 scale-[0.62] xs:scale-[0.72] sm:scale-[0.85] md:scale-95 lg:scale-90 xl:scale-100 origin-center xl:origin-right -my-15 xs:my-[-40px] sm:-my-5 md:my-0">
              <div className="flex flex-col gap-4 sm:gap-6 items-end">
                <div className="relative w-69 h-69 shrink-0">
                  <Image
                    src={heroImg1}
                    alt="Skilled technician"
                    fill
                    sizes="(max-width: 768px) 200px, 276px"
                    priority
                    className="object-contain"
                  />
                  <div className="absolute -top-5 -right-4.75 w-14 h-14 bg-[#FEEED3] rounded-full flex items-center justify-center z-20 select-none">
                    <button
                      type="button"
                      aria-label="Play video"
                      className="w-6.5 h-6.5 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    >
                      <Image
                        src={playIcon}
                        alt="Play icon"
                        width={26}
                        height={26}
                        priority
                        className="w-6.5 h-6.5 object-contain drop-shadow-xs"
                      />
                    </button>
                  </div>
                </div>

                <div className="relative w-95.25 h-52.5 shrink-0">
                  <Image
                    src={womanOnSystem}
                    alt="Trainee learning on laptop"
                    fill
                    sizes="(max-width: 768px) 280px, 381px"
                    priority
                    className="object-contain"
                  />
                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("courses")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="absolute top-0 right-0 w-50 h-16.75 bg-[#FAB951] hover:bg-[#F9AE3B] text-[#222222] font-bold text-[18px] tracking-tight rounded-[18px] flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer z-10 select-none"
                    aria-label="Explore 2k+ Courses"
                  >
                    <svg
                      className="w-5.5 h-4.5 text-[#222222] shrink-0"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="15"
                        height="16"
                        rx="3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="8.5" cy="9" r="1.75" fill="currentColor" />
                      <path
                        d="M16 6.5L22 4.2V13.8L16 11.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>2k+ Courses</span>
                  </a>
                </div>
              </div>

              <div className="relative w-69 h-86.75 rounded-2xl overflow-hidden shrink-0 self-center shadow-xs">
                <Image
                  src={heroImg2}
                  alt="Certified construction workers"
                  fill
                  sizes="(max-width: 768px) 200px, 276px"
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
