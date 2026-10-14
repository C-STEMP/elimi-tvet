"use client";

import Image from "next/image";
import { accessImg, redBg, yellowBg } from "@/assets";

export function AssessmentPlatformSection() {
  return (
    <section className="w-full bg-primary/10 p-4 sm:px-6 lg:p-8 xl:p-15">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#333333] tracking-tight leading-tight max-w-xl">
            Get Assessed With Our <br className="hidden sm:inline" />
            Competency Assessment Platform
          </h2>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-[#333333] max-w-lg sm:text-right leading-relaxed font-normal">
          Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in nisl
          pretium non dui scelerisque varius tristique mollis vitae.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl bg-primary p-6 sm:p-8 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
          <Image
            src={redBg}
            alt="Standard Assessment Background"
            fill
            className="object-cover object-center pointer-events-none select-none"
            priority
          />
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl lg:text-[26px] font-extrabold tracking-tight">
              Standard Assessment
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
              Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in
              nisl pretium non dui scelerisque varius tristique mollis vitae.
            </p>

            <div className="mt-5">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide">
                How It Works
              </h4>
              <ul className="space-y-1.5 text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-2 relative z-10">
            <a
              href="https://cap.e-limi.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-white px-7 py-2.5 text-xs md:text-sm lg:text-base font-bold text-primary hover:bg-gray-100 shadow-sm transition-all cursor-pointer"
            >
              Start Assessment
            </a>
          </div>
        </div>

        {/* Card 2: RPL - Recognition Of Prior Learning */}
        <div className="rounded-2xl bg-secondary p-6 sm:p-8 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
          <Image
            src={yellowBg}
            alt="RPL Background"
            fill
            className="object-cover object-center pointer-events-none select-none"
            priority
          />
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl lg:text-[26px] font-extrabold tracking-tight">
              RPL - Recognition Of Prior Learning
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white leading-relaxed font-normal">
              Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in
              nisl pretium non dui scelerisque varius tristique mollis vitae.
            </p>

            <div className="mt-5">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 tracking-wide">
                How It Works
              </h4>
              <ul className="space-y-1.5 text-sm text-white">
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
                <li className="flex items-start gap-2">
                  <span className="text-white font-bold">•</span>
                  <span>Lorem ipsum dolor sit amet consectetur.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-2 relative z-10">
            <a
              href="https://cap.e-limi.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-white px-7 py-2.5 text-xs md:text-sm lg:text-base font-bold text-secondary hover:bg-gray-100 shadow-sm transition-all cursor-pointer"
            >
              Get Assessed
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full h-56 sm:h-72 md:h-84 rounded-2xl overflow-hidden shadow-sm">
        <Image
          src={accessImg}
          alt="Artisans pottery & craft workshop"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>
    </section>
  );
}
