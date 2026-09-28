import { landingImg1 } from "@/assets";
import Image from "next/image";

const STATS = [
  { value: "14,800+", label: "Accredited Centres" },
  { value: "280+", label: "Certification Programmes" },
  { value: "45+", label: "Trade Curriculums" },
  { value: "100%", label: "Credential Safety" },
];

export function InfrastructureSection() {
  return (
    <section className="bg-white py-16 lg:py-24" id="about">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column Image */}
          <div
            data-aos="fade-right"
            className="relative h-95 sm:h-120 lg:col-span-5 lg:h-130 overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src={landingImg1}
              alt="Craftsman artisan working"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Right Column Content */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="flex flex-col justify-center lg:col-span-7"
          >
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#B3261E] uppercase">
              ABOUT ELIMI
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-[40px] leading-tight">
              Transforming TVET Delivery Across Africa
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#555]">
              ELIMI is the digital backbone for TVET delivery across Africa. We
              provide institutions, governments, and organisations with the tools to
              manage vocational programmes, track learner progress, assess
              competence, and report with certainty.
            </p>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#555]">
              By unifying learning management, competency-based assessment, and
              verified workforce registers into a single platform, ELIMI ensures
              every certification is earned, documented, and trusted.
            </p>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-100 bg-[#F9FAFB] p-4 text-center transition-all hover:shadow-sm"
                >
                  <div className="text-2xl font-extrabold text-[#AA1D3F] lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#7A6B6E]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
