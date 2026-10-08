"use client";

import React from "react";
import Image from "next/image";

export function AssessmentPlatformSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
      {/* Soft Rose Background Container */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-[#FCEDF1] border border-[#FAD8E0] p-6 sm:p-10 lg:p-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight max-w-lg">
              Get Assessed With Our <br className="hidden sm:inline" />
              Competency Assessment Platform
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md sm:text-right leading-relaxed font-normal">
            Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in nisl
            pretium non dui scelerisque varius tristique mollis vitae.
          </p>
        </div>

        {/* Two Large Cards: Standard Assessment (Burgundy) & RPL (Orange) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Standard Assessment */}
          <div className="rounded-2xl bg-[#75152B] p-6 sm:p-8 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Standard Assessment
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in
                nisl pretium non dui scelerisque varius tristique mollis vitae.
              </p>

              <div className="mt-5">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 tracking-wide">
                  How It Works
                </h4>
                <ul className="space-y-1.5 text-xs text-white/85">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-2">
              <a
                href="https://cap.e-limi.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-white px-7 py-2.5 text-xs sm:text-sm font-bold text-[#75152B] hover:bg-gray-100 shadow-sm transition-all cursor-pointer"
              >
                Start Assessment
              </a>
            </div>
          </div>

          {/* Card 2: RPL - Recognition Of Prior Learning */}
          <div className="rounded-2xl bg-[#F9A825] p-6 sm:p-8 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                RPL - Recognition Of Prior Learning
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in
                nisl pretium non dui scelerisque varius tristique mollis vitae.
              </p>

              <div className="mt-5">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 tracking-wide">
                  How It Works
                </h4>
                <ul className="space-y-1.5 text-xs text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-2">
              <a
                href="https://cap.e-limi.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-white px-7 py-2.5 text-xs sm:text-sm font-bold text-[#D97D00] hover:bg-gray-100 shadow-sm transition-all cursor-pointer"
              >
                Get Assessed
              </a>
            </div>
          </div>
        </div>

        {/* Panoramic Workshop Photo Banner */}
        <div className="relative w-full h-56 sm:h-72 md:h-84 rounded-2xl overflow-hidden shadow-sm">
          <Image
            src="/landing-img-1.jpg"
            alt="Artisans pottery & craft workshop"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
