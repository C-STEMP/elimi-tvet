"use client";

import React from "react";
import Image from "next/image";
import { contactBg } from "@/assets";

export function ContactHeroBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-8">
      <div className="relative w-full">
        {/* Curved Hero Image with right tab extension */}
        <Image
          src={contactBg}
          alt="Contact Us"
          priority
          className="w-full h-auto object-contain select-none pointer-events-none"
        />

        {/* Contact Us Box in the bottom-left cutout */}
        <div className="absolute bottom-0 left-0 w-[80%] h-[30%] sm:h-[31%] rounded-xl sm:rounded-2xl lg:rounded-[24px] bg-input-bg flex items-center px-4 sm:px-8 md:px-10 lg:px-12 select-none">
          <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-solid tracking-tight">
            Contact Us
          </h1>
        </div>
      </div>
    </section>
  );
}
