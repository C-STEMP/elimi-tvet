"use client";

import React, { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/toast";

export function ContactDetailsAndForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    country: "",
    city: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        organization: "",
        country: "",
        city: "",
        phone: "",
        message: "",
      });

      toast({
        type: "success",
        title: "Message Sent!",
        description:
          "Thank you for reaching out. Our team will get back to you shortly.",
      });

      setTimeout(() => setSubmitted(false), 4000);
    }, 600);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 lg:py-16" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:pt-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              CONTACT DETAILS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] tracking-tight">
              Multiple Ways To Reach Us
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
              Choose the communication channel that works best for you. Whether
              you prefer email, phone, or an in-person conversation, we&apos;re here
              to help.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {/* Email */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                Email
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                For general inquiries, consulting engagements, or partnership
                opportunities.
              </p>
              <a
                href="mailto:elimisupport@cstemp.org"
                className="inline-block mt-1 text-xs sm:text-sm font-semibold text-[#8B1E3F] hover:underline"
              >
                elimisupport@cstemp.org
              </a>
            </div>

            {/* Phone */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                Phone
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Speak directly with our team during business hours.
              </p>
              <a
                href="tel:+2348031234567"
                className="inline-block mt-1 text-xs sm:text-sm font-semibold text-[#8B1E3F] hover:underline"
              >
                +234 XXX XXX XXXX
              </a>
            </div>

            {/* Office */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                Office
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                Address: 3 Abbey Street, Kubwa Expressway, Abuja, Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-gray-100 p-6 sm:p-10 shadow-xl shadow-gray-100/70">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] tracking-tight">
                Contact Us
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                We&apos;d love to hear from you. Please fill out the form below and
                our team will get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
                />
              </div>

              {/* Organization (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Organization(Optional)
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="Type Here"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
                />
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Country Of Residence
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder="Type Here"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="Type Here"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number with +234 */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-secondary transition-colors">
                  <span className="inline-flex items-center px-4 bg-gray-50 border-r border-gray-200 text-xs sm:text-sm font-semibold text-gray-600 select-none">
                    +234
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="*** **** ***"
                    className="w-full bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-secondary py-3 sm:py-3.5 text-center text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary-hover transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : submitted
                      ? "Submitted!"
                      : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
