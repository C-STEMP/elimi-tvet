"use client";

import React from "react";
import Image from "next/image";

export function JobPortalSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
      {/* Light Gray Container */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-[#F4F6F9] border border-gray-200/60 p-6 sm:p-10 lg:p-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight max-w-lg">
              Get Hired and Hire <br className="hidden sm:inline" />
              Professionals Through <br className="hidden sm:inline" />
              Our Job Portal.
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs sm:text-right leading-relaxed font-normal">
              Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in
              nisl pretium non dui.
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

        {/* Content Grid: Photo Left + Stats Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Workshop photo */}
          <div className="lg:col-span-8 relative h-72 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/hero-img-3.jpg"
              alt="Workmasters Tradesmen Collaboration"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>

          {/* Dark Stats Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#20252B] p-6 sm:p-8 text-center text-white flex flex-col justify-around shadow-sm min-h-[300px]">
            {/* Stat 1 */}
            <div className="py-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Employers
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                50+
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Stat 2 */}
            <div className="py-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Job Openings
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                500+
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Stat 3 */}
            <div className="py-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Professionals
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                1000+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
