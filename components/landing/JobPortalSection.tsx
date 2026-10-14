"use client";

import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { professionImg } from "@/assets";

export function JobPortalSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto py-8 sm:py-12">
      <div className="rounded-[20px] bg-input-bg border border-gray-200/60 p-5 sm:p-6 lg:p-10">
        <div data-aos="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#333333] tracking-tight leading-tight max-w-xl">
            Get Hired and Hire Professional
            <br className="hidden sm:inline" />
            Through Our Job Portal.
          </h2>

          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs text-left sm:text-right leading-relaxed font-normal">
              Connect with vetted technicians, skilled artisans, and top
              employers across the nation.
            </p>
            <a
              href="https://workmasters.elimi.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-secondary px-7 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-secondary-hover transition-all cursor-pointer self-start sm:self-auto"
            >
              Find Workers
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            className="lg:col-span-10 relative h-64 sm:h-96 lg:h-105 rounded-2xl overflow-hidden shadow-sm"
          >
            <Image
              src={professionImg}
              alt="Workmasters Tradesmen Collaboration"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="lg:col-span-2 rounded-2xl bg-[#20252B] p-6 sm:p-8 text-center text-white flex flex-col justify-around shadow-sm min-h-75"
          >
            <div className="py-2">
              <span className="text-sm text-white tracking-wider">
                Employers
              </span>
              <div className="text-3xl sm:text-4xl font-semibold text-white mt-2">
                <CountUp
                  end={50}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                  suffix="+"
                />
              </div>
            </div>

            <div className="w-full h-px bg-white/50" />

            <div className="py-2">
              <span className="text-sm text-white tracking-wider">
                Job Openings
              </span>
              <div className="text-3xl sm:text-4xl font-semibold text-white mt-2">
                <CountUp
                  end={500}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                  suffix="+"
                />
              </div>
            </div>

            <div className="w-full h-px bg-white/50" />

            <div className="py-2">
              <span className="text-sm text-white tracking-wider">
                Professionals
              </span>
              <div className="text-3xl sm:text-4xl font-semibold text-white mt-2">
                <CountUp
                  end={1000}
                  duration={2.5}
                  separator=""
                  enableScrollSpy
                  scrollSpyOnce
                  suffix="+"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
