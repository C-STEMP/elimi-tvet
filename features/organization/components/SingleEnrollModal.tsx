"use client";

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

interface SingleEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  cohortName: string;
  onSuccess: (newLearner: any) => void;
}

export const SingleEnrollModal: React.FC<SingleEnrollModalProps> = ({
  isOpen,
  onClose,
  cohortName,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState("Painting & Decoration");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast({
        type: "error",
        title: "Required Fields",
        description: "Please fill in Candidate Name and Email.",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        id: `l-${Date.now()}`,
        name: fullName.trim(),
        trade,
        startDate: new Date().toLocaleDateString("en-GB"),
        status: "Completed",
      });
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity select-text"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative flex flex-col gap-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
              Enroll Individual Learner
            </h2>
            <p className="text-neutral-secondary text-xs sm:text-sm mt-1">
              Add a trainee to <strong className="text-neutral-primary">{cohortName}</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Babatunde Lawal"
          />

          <Input
            label="Email Address *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="trainee@email.com"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 801 234 5678"
          />

          <Select
            label="Trade / Stream"
            value={trade}
            onChange={(val) => setTrade(val)}
            options={[
              { label: "Painting & Decoration", value: "Painting & Decoration" },
              { label: "Masonry", value: "Masonry" },
              { label: "Carpentry", value: "Carpentry" },
              { label: "Plumbing", value: "Plumbing" },
              { label: "Electrical Installation", value: "Electrical Installation" },
            ]}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="rounded-xl border-gray-200 text-gray-700 font-bold text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="amber"
              size="md"
              disabled={isSubmitting}
              className="h-11 px-6 text-white font-bold text-xs sm:text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
            >
              {isSubmitting ? "Enrolling..." : "Enroll Learner"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
