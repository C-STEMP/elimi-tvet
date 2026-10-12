"use client";

import React, { useState } from "react";
import { HiChevronDown, HiMinus } from "react-icons/hi";

const FAQS = [
  {
    id: 1,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor.",
  },
  {
    id: 2,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Varius sollicitudin risus sapien eget. Gravida egestas diam suspendisse feugiat vulputate.",
  },
  {
    id: 3,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Pellentesque vel quam in nisl pretium non dui scelerisque varius tristique mollis vitae. Phasellus interdum euismod odio.",
  },
  {
    id: 4,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.",
  },
  {
    id: 5,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam at sapien quis tellus.",
  },
  {
    id: 6,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Integer facilisis, elit eu dictum convallis, neque sem facilisis nunc, nec molestie dolor justo eget est.",
  },
  {
    id: 7,
    question: "Lorem Ipsum Dolor  Lorem Ipsum Dolor",
    answer:
      "Aliquam erat volutpat. Etiam sit amet orci quis dolor commodo hendrerit. Nulla facilisi.",
  },
];

export function FaqAccordionSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm sm:text-right leading-relaxed font-normal">
          Lorem ipsum dolor sit amet consectetur. Pellentesque vel quam in nisl
          pretium non dui scelerisque varius tristique mollis vitae.
        </p>
      </div>

      <div className="space-y-3.5 max-w-5xl mx-auto">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-gray-200 bg-[#F9FAFC] shadow-xs"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
              >
                <span className="text-sm sm:text-base font-bold text-text-dark pr-4">
                  {faq.question}
                </span>

                <div className="shrink-0 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  {isOpen ? (
                    <HiMinus className="w-4 h-4 text-gray-700" />
                  ) : (
                    <HiChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal border-t border-gray-100/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
