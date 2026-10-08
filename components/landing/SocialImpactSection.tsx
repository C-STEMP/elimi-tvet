"use client";

import React from "react";
import { HiStar } from "react-icons/hi";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "“We’ve seen a 3x increase in job placements after partnering on workforce training. The curriculum is practical, intensive, and sets people up for long-term success.”",
    name: "Rex Allen",
    role: "Director of Workforce Development - BrightSkills Network",
  },
  {
    id: 2,
    quote:
      "“This program didn’t just train people - it helped us build trust and capacity in neighborhoods that need it most. The impact is visible in every community meeting.”",
    name: "Amira Patel",
    role: "Executive Director - Neighborhood Action Initiative",
  },
  {
    id: 3,
    quote:
      "“The data is clear: this work is driving measurable social change. It’s breaking ingrained stereotypes, and creating a more equitable future for everyone.”",
    name: "Kofi Mensah",
    role: "Chief Impact Officer - Social Frontier Coalition",
  },
];

export function SocialImpactSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 lg:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] tracking-tight">
            Our Positive Social Impact
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm sm:text-right leading-relaxed font-normal">
          Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in nisl
          pretium non dui scelerisque varius tristique mollis vitae.
        </p>
      </div>

      {/* 3 Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-rose-100 bg-[#FCF8F9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#F9A825] mb-4">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                {t.quote}
              </p>
            </div>

            {/* Author */}
            <div className="mt-6 pt-4 border-t border-gray-200/60">
              <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5 leading-snug">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
