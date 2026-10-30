"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineMail,
  HiOutlineCheck,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";
import { WhiteNavbar } from "./WhiteNavbar";
import { PlatformSelectModal, AuthMode } from "./PlatformSelectModal";
import { AosProvider } from "./AosProvider";

export function WorkmastersComingSoonView() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubscribed(true);
    }, 500);
  };

  return (
    <AosProvider>
      <div className="min-h-screen sm:h-screen flex flex-col justify-between bg-white select-text overflow-x-hidden sm:overflow-hidden">
        {/* Top Navbar */}
        <WhiteNavbar onOpenAuthModal={handleOpenAuthModal} />

        {/* Center Coming Soon View (Single viewport, no scrolling) */}
        <main className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 text-center my-auto">
          {/* Subtle warm background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-amber-100/35 via-orange-50/20 to-transparent pointer-events-none blur-3xl -z-10" />

          <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4"
            >
              <HiOutlineArrowNarrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            {/* Coming Soon Badge */}
            <div
              data-aos="fade-up"
              className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/90 px-3.5 py-1 shadow-2xs mb-4"
            >
              <HiOutlineSparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Coming Soon · Workmasters
              </span>
            </div>

            {/* Headline */}
            <h1
              data-aos="fade-up"
              data-aos-delay="50"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E] leading-[1.18]"
            >
              The Marketplace for{" "}
              <span className="text-secondary">Verified Skilled Trades</span>
            </h1>

            {/* Subheading */}
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-3.5 text-xs sm:text-sm md:text-base text-gray-500 max-w-lg mx-auto leading-relaxed"
            >
              We are actively building <strong>Workmasters</strong> — Nigeria’s
              dedicated platform connecting vetted artisans, certified
              technicians, and NSQ-accredited trade professionals with top
              employers, contractors, and households nationwide.
            </p>

            {/* Email Notification Form */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="mt-6 w-full max-w-md mx-auto"
            >
              {isSubscribed ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 sm:p-3.5 flex items-center gap-3 text-left text-emerald-900 shadow-2xs">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <HiOutlineCheck className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold">You’re on the waitlist!</p>
                    <p className="text-[11px] text-emerald-700">
                      We’ll notify you as soon as Workmasters opens for registrations.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleNotifySubmit}
                  className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-white border border-gray-200 shadow-sm focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all"
                >
                  <div className="relative flex-1 flex items-center pl-3">
                    <HiOutlineMail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full bg-transparent px-2.5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer whitespace-nowrap rounded-xl bg-secondary px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-secondary-hover transition-all active:scale-95 disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Notify Me"}
                  </button>
                </form>
              )}
              <p className="mt-2 text-[11px] text-gray-400">
                No spam guaranteed. We will only reach out with early access invitations.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-gray-500"
            >
              <span className="text-gray-400 hidden sm:inline">Explore active platforms:</span>
              <a
                href="https://training.elimi.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-600 hover:text-secondary transition-colors px-2.5 py-1 rounded-lg hover:bg-gray-50"
              >
                Skills Training (LMS) →
              </a>
              <span className="text-gray-300">·</span>
              <a
                href="https://cap.e-limi.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-600 hover:text-secondary transition-colors px-2.5 py-1 rounded-lg hover:bg-gray-50"
              >
                Assessment (CAP) →
              </a>
            </div>
          </div>
        </main>

        {/* Minimal 1-line Footer */}
        <footer className="w-full border-t border-gray-100 py-3.5 px-4 sm:px-6 lg:px-8 xl:px-15 bg-white shrink-0">
          <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} ELIMI Africa. All rights reserved.</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Link href="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-secondary transition-colors">
                Contact Us
              </Link>
              <span>·</span>
              <a
                href="https://cap.e-limi.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                CAP Portal
              </a>
            </div>
          </div>
        </footer>

        {/* Auth modal when user clicks Login or Register in Navbar */}
        {authModalOpen && (
          <PlatformSelectModal
            isOpen={authModalOpen}
            initialMode={authMode}
            onClose={() => setAuthModalOpen(false)}
          />
        )}
      </div>
    </AosProvider>
  );
}
