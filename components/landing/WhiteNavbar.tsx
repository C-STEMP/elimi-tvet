"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthMode } from "./PlatformSelectModal";

interface WhiteNavbarProps {
  onOpenAuthModal?: (mode: AuthMode) => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Skills Training",
    href: "https://training.elimi.africa/",
    external: true,
  },
  { label: "Assessment", href: "https://cap.e-limi.africa/", external: true },
  {
    label: "Workmasters",
    href: "/workmasters",
    external: false,
  },
  { label: "Contact Us", href: "/contact" },
];

export function WhiteNavbar({ onOpenAuthModal }: WhiteNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthClick = (mode: AuthMode) => {
    if (onOpenAuthModal) {
      onOpenAuthModal(mode);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center shrink-0 transition-all duration-300">
      <div className="mx-auto flex w-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-15">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <Image
            src="/elimi-logo-dark.svg"
            alt="Elimi Logo"
            width={120}
            height={68}
            className="h-auto w-auto object-contain"
            style={{ width: "auto", height: "auto" }}
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-xs lg:text-sm font-semibold text-gray-700 hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              );
            }

            const isHome = link.href === "/";
            const isActive = isHome
              ? !pathname || pathname === "/"
              : pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap text-xs lg:text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-secondary font-bold"
                    : "text-gray-700 hover:text-secondary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons (Login + Register) */}
        <div className="hidden items-center gap-4 lg:gap-6 md:flex">
          {onOpenAuthModal ? (
            <>
              <button
                type="button"
                onClick={() => handleAuthClick("login")}
                className="cursor-pointer whitespace-nowrap text-xs lg:text-sm font-semibold text-gray-800 transition-colors hover:text-secondary"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleAuthClick("register")}
                className="cursor-pointer whitespace-nowrap rounded-xl bg-secondary px-5 lg:px-7 py-2.5 text-xs lg:text-sm font-bold text-white transition-all hover:bg-secondary-hover shadow-sm active:scale-95"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <Link
                href="/gateway?mode=login"
                className="cursor-pointer whitespace-nowrap text-xs lg:text-sm font-semibold text-gray-800 transition-colors hover:text-secondary"
              >
                Login
              </Link>
              <Link
                href="/gateway?mode=register"
                className="cursor-pointer whitespace-nowrap rounded-xl bg-secondary px-5 lg:px-7 py-2.5 text-xs lg:text-sm font-bold text-white transition-all hover:bg-secondary-hover shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 border-t border-gray-100 bg-white px-4 pt-4 pb-8 md:hidden shadow-xl z-50">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 text-base font-medium text-gray-700 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                );
              }

              const isHome = link.href === "/";
              const isActive = isHome
                ? !pathname || pathname === "/"
                : pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 text-base transition-colors ${
                    isActive
                      ? "text-secondary font-bold"
                      : "text-gray-700 font-medium hover:text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Auth Actions */}
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
              {onOpenAuthModal ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAuthClick("login");
                    }}
                    className="w-full text-center py-2.5 text-base font-semibold text-gray-800 hover:text-secondary rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAuthClick("register");
                    }}
                    className="w-full rounded-xl bg-secondary py-3 text-center text-base font-bold text-white shadow-md hover:bg-secondary-hover cursor-pointer"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/gateway?mode=login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-base font-semibold text-gray-800 hover:text-secondary rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    href="/gateway?mode=register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-xl bg-secondary py-3 text-center text-base font-bold text-white shadow-md hover:bg-secondary-hover cursor-pointer"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
