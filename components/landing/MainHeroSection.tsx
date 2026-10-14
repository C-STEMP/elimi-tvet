"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <section className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto pt-3 sm:pt-6 pb-6 sm:pb-8">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#FEEED3] border border-[#FEEAD4]/60 p-5 xs:p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 sm:gap-10 xl:gap-8">
          <div className="w-full xl:max-w-122.5 flex flex-col items-start space-y-4 sm:space-y-6 shrink-0">
            <div
              data-aos="fade-down"
              className="inline-flex items-center gap-1 lg:gap-2 rounded-full bg-white px-3 py-1.5 shadow-xs border border-[#FDE0C2] text-xs font-semibold text-gray-800 select-none"
            >
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
                <span className="font-medium text-xs lg:text-sm text-[#333333]">
                  5.0
                </span>
                <span className="text-[#333333] text-xs lg:text-sm font-medium">
                  (2k+ Happy Learners)
                </span>
              </div>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-text-dark tracking-tight leading-[1.12]"
            >
              Unlock Skills That <br className="hidden sm:inline" />
              Will Shape Your <br className="hidden sm:inline" />
              Future
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-xs sm:text-sm md:text-base text-[#333333] leading-relaxed font-medium max-w-lg"
            >
              Build your skills, assess your abilities, earn certificates, and
              explore job opportunities, all on one platform designed to help
              you take the next step in your career
            </p>

            <div data-aos="fade-up" data-aos-delay="300" className="pt-2">
              {onOpenAuthModal ? (
                <button
                  type="button"
                  onClick={() => onOpenAuthModal("register")}
                  className="inline-block rounded-xl bg-secondary px-7 sm:px-10 py-3 sm:py-4 text-xs md:text-sm lg:text-base font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer active:scale-95"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  href="/gateway?mode=register"
                  className="inline-block rounded-xl bg-secondary px-7 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all cursor-pointer"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          <div className="w-full xl:w-145 2xl:w-155 flex items-center justify-center xl:justify-end pt-4 xl:pt-0">
            <div className="relative w-full max-w-120 sm:max-w-140 xl:max-w-none grid grid-cols-[1.38fr_1fr] items-center gap-2.5 sm:gap-4 md:gap-5">
              <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 items-end w-full">
                {/* Top Image: Worker in hardhat (playful spring pop + gentle float) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 30, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 13,
                    delay: 0.15,
                  }}
                  className="relative w-[74%] aspect-square shrink-0"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={heroImg1}
                      alt="Skilled technician"
                      fill
                      sizes="(max-width: 640px) 150px, (max-width: 1024px) 240px, 276px"
                      priority
                      className="object-contain"
                    />

                    {/* Cute Play Button Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 10,
                        delay: 0.45,
                      }}
                      className="absolute -top-2 -right-2 sm:-top-3.5 sm:-right-3.5 md:-top-4 md:-right-4 w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#FEEED3] rounded-full flex items-center justify-center z-20 select-none shadow-xs"
                    >
                      <motion.button
                        type="button"
                        aria-label="Play video"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{
                          scale: {
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        className="w-5 h-5 sm:w-6.5 sm:h-6.5 flex items-center justify-center rounded-full cursor-pointer"
                      >
                        <Image
                          src={playIcon}
                          alt="Play icon"
                          width={26}
                          height={26}
                          priority
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6.5 md:h-6.5 object-contain drop-shadow-xs"
                        />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Bottom Image: Trainee learning on laptop (pop + counter-phase float) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 30, rotate: 2 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 13,
                    delay: 0.3,
                  }}
                  className="relative w-full aspect-381/210 shrink-0"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      duration: 4.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={womanOnSystem}
                      alt="Trainee learning on laptop"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 381px"
                      priority
                      className="object-contain"
                    />

                    {/* Cute 2k+ Courses Badge (Matching Figma cutout alignment) */}
                    <motion.a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("courses")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      initial={{ opacity: 0, scale: 0.5, x: 25 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 11,
                        delay: 0.55,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-0 right-0 w-[53%] h-[32%] bg-[#FAB951] hover:bg-[#F9AE3B] text-[#222222] font-bold text-[8.5px] min-[360px]:text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-sm lg:text-[16px] tracking-tight rounded-md xs:rounded-lg sm:rounded-xl md:rounded-[18px] flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5 px-1 xs:px-1.5 sm:px-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer z-10 select-none whitespace-nowrap"
                      aria-label="Explore 2k+ Courses"
                    >
                      <svg
                        className="w-2.5 h-2 xs:w-3.5 xs:h-2.5 sm:w-4.5 sm:h-3.5 md:w-5 md:h-4 text-[#222222] shrink-0"
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
                      <span className="whitespace-nowrap font-bold text-[#222222]">
                        2k+ Courses
                      </span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Image: Certified construction workers (bouncy scale-in + float) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                  delay: 0.4,
                }}
                className="relative w-full aspect-276/347 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 self-center shadow-xs"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={heroImg2}
                    alt="Certified construction workers"
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 276px"
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
