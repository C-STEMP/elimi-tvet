"use client";

import {
  FaAward,
  FaBuilding,
  FaHandshake,
  FaGlobe,
  FaCertificate,
} from "react-icons/fa";

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
    <section className="w-full py-6 sm:py-8 bg-white overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-15">
        <div className="relative pb-10 border-b border-[#33333333] pt-2 overflow-hidden marquee-mask">
          <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] opacity-70 hover:opacity-100 transition-opacity">
            {/* First sequence of partners */}
            <div className="flex items-center gap-8 sm:gap-14 pr-8 sm:pr-14 shrink-0">
              {PARTNERS.concat(PARTNERS).map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={`p1-${index}`}
                    className="flex items-center gap-2.5 text-black whitespace-nowrap select-none font-bold text-sm sm:text-base tracking-tight shrink-0"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    <span>{partner.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Seamless duplicate sequence for continuous infinite loop */}
            <div
              className="flex items-center gap-8 sm:gap-14 pr-8 sm:pr-14 shrink-0"
              aria-hidden="true"
            >
              {PARTNERS.concat(PARTNERS).map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={`p2-${index}`}
                    className="flex items-center gap-2.5 text-black whitespace-nowrap select-none font-bold text-sm sm:text-base tracking-tight shrink-0"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    <span>{partner.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
