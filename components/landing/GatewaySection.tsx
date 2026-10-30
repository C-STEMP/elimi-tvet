"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineArrowNarrowRight, HiArrowLeft } from "react-icons/hi";

export type AuthMode = "login" | "register";

interface GatewaySectionProps {
  initialMode?: AuthMode;
  onLearnMore?: () => void;
  onBack?: () => void;
}

interface PlatformCard {
  id: string;
  title: string;
  subtitle: string;
  action: () => void;
}

export function GatewaySection({
  initialMode = "register",
  onLearnMore,
  onBack,
}: GatewaySectionProps) {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);

  const isLogin = authMode === "login";

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      router.push("/");
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  const platformCards: PlatformCard[] = [
    {
      id: "training",
      title: "Training",
      subtitle: isLogin
        ? "Access your courses & learn on ELIMI LMS"
        : "NOS-aligned trade courses & interactive learning",
      action: () => {
        window.location.href = isLogin
          ? "https://training.elimi.africa/login"
          : "https://training.elimi.africa/register";
      },
    },
    {
      id: "cap",
      title: "CAP",
      subtitle: "Competency assessment Portal",
      action: () => {
        window.location.href = isLogin
          ? "https://cap.e-limi.africa/login"
          : "https://cap.e-limi.africa/register";
      },
    },
    {
      id: "workmasters",
      title: "Workmasters",
      subtitle: isLogin
        ? "Access verified trade professional profile"
        : "Get discovered & hired by top employers",
      action: () => {
        router.push("/workmasters");
      },
    },
    {
      id: "organization",
      title: "Organization",
      subtitle: isLogin
        ? "Institutional TVET portal & cohort management"
        : "Register your institution or enterprise training",
      action: () => {
        router.push(isLogin ? "/login" : "/register");
      },
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-secondary selection:text-white">
      <div className="relative w-full lg:w-[42%] xl:w-[40%] min-h-140 lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 xl:p-16 text-white overflow-hidden select-none">
        <Image
          src="/hero-img-3.jpg"
          alt="ELIMI Craftsman"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/75 z-0" />

        <div className="relative z-10 flex flex-col justify-between h-full min-h-130">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleBack}
              className="outline-none cursor-pointer"
            >
              <Image
                src="/elimi-logo-white.svg"
                alt="ELIMI Logo"
                width={128}
                height={44}
                priority
                className="h-9 w-auto object-contain"
              />
            </button>
          </div>

          <div className="my-auto py-10 lg:py-0 flex flex-col items-start">
            <h1 className="text-3xl sm:text-4xl xl:text-[44px] font-extrabold tracking-tight leading-[1.15] max-w-md">
              Build a verified career in your trade.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-md">
              Learn, get NSQ-certified, and get discovered by employers, all
              from one ELIMI account.
            </p>

            <button
              type="button"
              onClick={handleLearnMore}
              className="mt-6 inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-base group cursor-pointer hover:text-secondary transition-colors"
            >
              <span className="underline underline-offset-4 decoration-white/70 group-hover:decoration-secondary">
                Learn More
              </span>
              <HiOutlineArrowNarrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <div className="w-full pt-4">
            <div className="w-full h-px bg-white/20 mb-4" />
            <blockquote className="text-xs sm:text-sm xl:text-[15px] text-white/90 leading-relaxed font-normal max-w-md">
              &ldquo;ELIMI helped me get NSQ Level 3 certified as a carpenter
              after 9 years on the job — no classroom needed.&rdquo;
            </blockquote>
            <cite className="block mt-2 text-xs text-white/70 font-medium not-italic">
              Tunde Balogun · Carpenter, Ibadan
            </cite>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[58%] xl:w-[60%] min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-16 xl:px-28 py-12 lg:py-16 bg-white relative">
        <div className="w-full max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
            >
              <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>

            <div className="inline-flex items-center rounded-xl bg-gray-100 p-1 text-xs">
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`rounded-lg px-3 py-1.5 font-bold transition-all cursor-pointer ${
                  !isLogin
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`rounded-lg px-3 py-1.5 font-bold transition-all cursor-pointer ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-text-dark tracking-tight leading-tight">
              What would you like to do on ELIMI?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
              {isLogin
                ? "Choose which portal to sign in to."
                : "Choose which portal to register with."}
            </p>
          </div>

          <div className="mt-8 space-y-4 sm:space-y-4.5">
            {platformCards.map((card) => {
              const isCardDisabled =
                !isLogin &&
                (card.id === "organization" || card.id === "workmasters");

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (card.id === "workmasters") {
                      card.action();
                      return;
                    }
                    if (isCardDisabled) return;
                    card.action();
                  }}
                  aria-disabled={isCardDisabled && card.id !== "workmasters"}
                  className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-200 border flex items-center justify-between ${
                    isCardDisabled && card.id !== "workmasters"
                      ? "bg-input-bg/70 border-gray-200/60 opacity-60 cursor-not-allowed select-none"
                      : "bg-input-bg hover:bg-[#EEF1F6] cursor-pointer border-transparent hover:border-gray-200 hover:shadow-md group"
                  }`}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden select-none opacity-90">
                    <Image
                      src="/card-white.png"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 60vw, 30vw"
                      className="object-cover object-right"
                    />
                  </div>

                  <div className="relative z-10 flex flex-col pr-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xl sm:text-2xl font-bold transition-colors ${
                          isCardDisabled
                            ? "text-gray-500"
                            : "text-text-dark group-hover:text-primary"
                        }`}
                      >
                        {card.title}
                      </span>
                      {isCardDisabled && (
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-normal mt-1 leading-snug">
                      {card.subtitle}
                    </span>
                  </div>

                  <div
                    className={`relative z-10 shrink-0 transition-all ${
                      isCardDisabled
                        ? "text-gray-300"
                        : "text-gray-700 group-hover:text-primary group-hover:translate-x-1.5"
                    }`}
                  >
                    <HiOutlineArrowNarrowRight className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
