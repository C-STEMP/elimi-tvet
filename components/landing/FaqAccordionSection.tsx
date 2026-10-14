"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    id: 1,
    question: "What is Elimi and how does the ecosystem work?",
    answer:
      "Elimi is an integrated TVET platform that connects practical vocational training (Elimi LMS), competency assessments (Elimi CAP), and vetted job placement (Workmasters) into a single unified journey.",
  },
  {
    id: 2,
    question: "What is the Competency Assessment Platform (CAP)?",
    answer:
      "CAP provides standardized theoretical and hands-on practical assessments that evaluate technical abilities and award nationally accredited certifications.",
  },
  {
    id: 3,
    question: "What is Recognition of Prior Learning (RPL)?",
    answer:
      "RPL allows artisans with years of informal apprenticeship or on-the-job experience to formalize their craft and earn recognized vocational qualifications without starting from scratch.",
  },
  {
    id: 4,
    question: "How does Workmasters connect artisans with jobs?",
    answer:
      "Workmasters is our dedicated marketplace where certified artisans and technicians create verified profiles and connect directly with hiring employers, contractors, and clients.",
  },
  {
    id: 5,
    question: "Are Elimi certifications recognized by employers?",
    answer:
      "Yes, our assessments and curriculum are developed in partnership with industry leaders, regulatory bodies, and TVET authorities to ensure national market validity.",
  },
  {
    id: 6,
    question: "Can I learn online as well as gain practical workshop experience?",
    answer:
      "Yes, Elimi offers a hybrid learning model with flexible online theory modules complemented by physical hands-on training at accredited technical workshops.",
  },
  {
    id: 7,
    question: "How do I get started as a learner, artisan, or employer?",
    answer:
      "Click 'Get Started' to choose your path: enroll in technical courses, register for a competency assessment, or hire certified professionals for your projects.",
  },
];

export function FaqAccordionSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-15 mx-auto py-12 lg:py-16">
      <div
        data-aos="fade-up"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      >
        <div>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#333333] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-[#333333] max-w-lg text-left sm:text-right leading-relaxed font-normal">
          Find clear answers to common questions about our vocational courses,
          competency assessments, and career placement services.
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="space-y-3.5 mx-auto"
      >
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? "border-gray-200 bg-input-bg shadow-xs"
                  : "border-gray-100 bg-input-bg hover:border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer focus:outline-none select-none"
              >
                <span className="text-sm sm:text-base font-bold text-[#333333] pr-4 leading-snug">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-black shadow-xs"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal border-t border-gray-100/60 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
