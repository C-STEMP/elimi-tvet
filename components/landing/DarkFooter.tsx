"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

export function DarkFooter() {
  return (
    <footer className="w-full bg-[#333333] text-white/80 pt-12 sm:pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-5">
            <Logo theme="light" width={115} href="/" />

            <p className="max-w-sm text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              Nigeria&apos;s unified path from skill to certification to career,
              built on recognised qualifications and verified national
              standards.
            </p>

            <div className="flex items-center gap-3.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-7">
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/80">
                <li>
                  <a
                    href="https://cap.e-limi.africa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    CAP
                  </a>
                </li>
                <li>
                  <a
                    href="https://training.elimi.africa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Learn
                  </a>
                </li>
                <li>
                  <a
                    href="#workmasters"
                    className="hover:text-white transition-colors"
                  >
                    WorkMasters
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Who it&apos;s for
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/80">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    Institutions
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    Government
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    Programme partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Legal
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/80">
                <li>
                  <Link
                    href="#terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="#privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#conditions"
                    className="hover:text-white transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Divider, Copyright & Sitemap */}
        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white gap-3">
          <div className="hidden sm:block w-16" />
          <div className="text-center font-medium tracking-wider">
            ELIMI 2026
          </div>
          <div className="sm:text-right">
            <Link
              href="#sitemap"
              className="hover:text-white transition-colors font-medium"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
