"use client";

import React from "react";
import Image from "next/image";

export function ContactHeroBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 sm:pt-8">
      {/* Banner Container with curved corners */}
      <div className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[36px] bg-[#2A1D20] shadow-sm min-h-[170px] sm:min-h-[220px] md:min-h-[250px] flex items-end">
        {/* Clean photo of hands holding smartphone with NO baked text */}
        <Image
          src="/contact-hands-clean.png"
          alt="Contact Support"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />

        {/* Soft bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* The single, crisp white badge card "Contact Us" */}
        <div className="relative z-10 m-4 sm:m-6 md:m-8 rounded-2xl sm:rounded-3xl bg-white px-6 sm:px-10 py-3 sm:py-4 shadow-md border border-gray-100 select-none">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#661126] tracking-tight">
            Contact Us
          </h1>
        </div>
      </div>
    </section>
  );
}
