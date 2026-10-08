"use client";

import React from "react";
import { FaAward, FaBuilding, FaHandshake, FaGlobe, FaCertificate } from "react-icons/fa";

const PARTNERS = [
  { name: "KeepLocal", icon: FaAward },
  { name: "EcoBuild", icon: FaBuilding },
  { name: "SkillAlign", icon: FaHandshake },
  { name: "NABTEB Alliance", icon: FaCertificate },
  { name: "GlobalCraft", icon: FaGlobe },
  { name: "ApexTrade", icon: FaAward },
];

export function PartnerStripSection() {
  return (
    <section className="w-full py-6 sm:py-8 border-y border-gray-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-10 overflow-x-auto no-scrollbar py-2 opacity-65 hover:opacity-100 transition-opacity">
          {PARTNERS.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-gray-700 whitespace-nowrap select-none font-bold text-sm sm:text-base tracking-tight shrink-0"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span>{partner.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
