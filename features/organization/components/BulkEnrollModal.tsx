"use client";

import React, { useState } from "react";
import {
  FiX,
  FiUpload,
  FiArrowRight,
  FiArrowLeft,
  FiPlus,
  FiCheck,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface CourseEnrollmentItem {
  id: string;
  course: string;
  file: File | null;
}

interface AssessmentEnrollmentItem {
  key: "nsq" | "rpl";
  title: string;
  file: File | null;
}

interface BulkEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  cohortName: string;
  trainingSlots?: number;
  assessmentSlots?: number;
  onSuccess: (count: number) => void;
}

const AVAILABLE_COURSES = [
  "Painting & Decoration",
  "Masonry & Bricklaying",
  "Carpentry & Joinery",
  "Plumbing & Pipefitting",
  "Electrical Installation & Maintenance",
  "Welding & Fabrication",
  "Solar PV Installation",
];

export const BulkEnrollModal: React.FC<BulkEnrollModalProps> = ({
  isOpen,
  onClose,
  cohortName,
  trainingSlots = 150,
  assessmentSlots = 100,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [activeTrack, setActiveTrack] = useState<"training" | "assessment">(
    "training"
  );
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Training track courses
  const [trainingCourses, setTrainingCourses] = useState<CourseEnrollmentItem[]>([
    { id: "tc-1", course: "", file: null },
    { id: "tc-2", course: "", file: null },
  ]);

  // Assessment track items
  const [assessmentItems, setAssessmentItems] = useState<AssessmentEnrollmentItem[]>([
    { key: "nsq", title: "NSQ Assessment Level 1", file: null },
    { key: "rpl", title: "RPL Assessment", file: null },
  ]);

  if (!isOpen) return null;

  const handleDownloadTemplate = (type: string) => {
    toast({
      type: "info",
      title: "Downloading Template",
      description: `CSV template for ${type} is downloading...`,
    });
  };

  const handleAddCourse = () => {
    setTrainingCourses((prev) => [
      ...prev,
      { id: `tc-${Date.now()}`, course: "", file: null },
    ]);
  };

  const handleCourseChange = (id: string, course: string) => {
    setTrainingCourses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, course } : item))
    );
  };

  const handleCourseFileChange = (id: string, file: File | null) => {
    setTrainingCourses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, file } : item))
    );
  };

  const handleAssessmentFileChange = (key: "nsq" | "rpl", file: File | null) => {
    setAssessmentItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, file } : item))
    );
  };

  const handleEnrollSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
    }, 600);
  };

  const handleContinueSuccess = () => {
    setIsSubmittedSuccess(false);
    onSuccess(trainingSlots + assessmentSlots);
    onClose();
  };

  const handleResetAndClose = () => {
    setIsSubmittedSuccess(false);
    setActiveTrack("training");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity select-text"
      onClick={handleResetAndClose}
    >
      {/* 1. Success Congratulations Modal (media_1790802495137.png) */}
      {isSubmittedSuccess ? (
        <div
          className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full shadow-2xl relative flex flex-col items-center text-center gap-5 animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Green Checkmark Circle Badge */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#56DE80] to-[#22C55E] flex items-center justify-center text-white shadow-lg ring-8 ring-green-100">
            <FiCheck className="w-10 h-10 stroke-[3]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary">
              Congratulations
            </h2>
            <p className="text-xs sm:text-sm text-neutral-secondary">
              You have successfully enrolled learners
            </p>
          </div>

          <Button
            type="button"
            variant="amber"
            size="lg"
            onClick={handleContinueSuccess}
            className="w-full h-12 text-white font-bold text-sm sm:text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl mt-2"
          >
            Continue
          </Button>
        </div>
      ) : (
        /* 2. Enroll Learners Modal (media_1790802494851.png & media_1790802495135.png) */
        <div
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative flex flex-col gap-5 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
                Enroll Learners
              </h2>
              <p className="text-neutral-secondary text-xs sm:text-sm mt-0.5">
                Batch upload trainee spreadsheets to enroll into {cohortName}.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#8F1532] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Close modal"
            >
              <FiX className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Segmented Track Pills */}
          <div className="bg-[#F4F5F7] p-1 rounded-xl flex items-center gap-1 w-fit">
            <button
              type="button"
              onClick={() => setActiveTrack("training")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTrack === "training"
                  ? "bg-[#8F1532] text-white shadow-xs"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Training Track ({trainingSlots})
            </button>

            <button
              type="button"
              onClick={() => setActiveTrack("assessment")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTrack === "assessment"
                  ? "bg-[#8F1532] text-white shadow-xs"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Assessment Track ({assessmentSlots})
            </button>
          </div>

          {/* Tab 1 Content: Training Track (media_1790802494851.png) */}
          {activeTrack === "training" && (
            <div className="flex flex-col gap-4">
              {trainingCourses.map((tc, index) => (
                <div
                  key={tc.id}
                  className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-100"
                >
                  <label className="text-xs sm:text-sm font-semibold text-neutral-primary">
                    Select Course
                  </label>

                  <select
                    value={tc.course}
                    onChange={(e) => handleCourseChange(tc.id, e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-neutral-primary focus:outline-none focus:ring-2 focus:ring-[#8F1532]/20 focus:border-[#8F1532] cursor-pointer"
                  >
                    <option value="">Select</option>
                    {AVAILABLE_COURSES.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>

                  {/* Dashed upload box with red/burgundy styling */}
                  <div className="border-2 border-dashed border-[#8F1532]/40 hover:border-[#8F1532] rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-1.5 bg-white hover:bg-rose-50/20 transition-all cursor-pointer relative">
                    <input
                      type="file"
                      accept=".csv, .xlsx, .xls"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleCourseFileChange(tc.id, e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    <FiUpload className="w-5 h-5 text-[#8F1532] stroke-[2.5]" />

                    {tc.file ? (
                      <span className="font-bold text-xs sm:text-sm text-emerald-700 flex items-center gap-1">
                        <FiCheck className="w-4 h-4 stroke-[3]" />
                        {tc.file.name}
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadTemplate(tc.course || "Course");
                          }}
                          className="text-[#8F1532] font-semibold text-xs sm:text-sm underline hover:opacity-80 cursor-pointer"
                        >
                          Download Template
                        </button>
                        <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                          Click to Upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Enrollment Button */}
              <button
                type="button"
                onClick={handleAddCourse}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8F1532] hover:text-[#701026] transition-colors cursor-pointer w-fit pt-1"
              >
                <FiPlus className="w-4 h-4 stroke-[3]" />
                Add New Enrollment
              </button>

              {/* Footer CTA: Next -> */}
              <div className="flex justify-end pt-3">
                <Button
                  type="button"
                  variant="amber"
                  size="md"
                  onClick={() => setActiveTrack("assessment")}
                  className="h-11 px-7 text-white font-bold text-xs sm:text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-2"
                >
                  <span>Next</span>
                  <FiArrowRight className="w-4 h-4 stroke-[3]" />
                </Button>
              </div>
            </div>
          )}

          {/* Tab 2 Content: Assessment Track (media_1790802495135.png) */}
          {activeTrack === "assessment" && (
            <div className="flex flex-col gap-4">
              {assessmentItems.map((item) => (
                <div
                  key={item.key}
                  className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-gray-100"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-primary">
                    {item.title}
                  </h3>

                  {/* Dashed upload box with red/burgundy styling */}
                  <div className="border-2 border-dashed border-[#8F1532]/40 hover:border-[#8F1532] rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-1.5 bg-white hover:bg-rose-50/20 transition-all cursor-pointer relative">
                    <input
                      type="file"
                      accept=".csv, .xlsx, .xls"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleAssessmentFileChange(item.key, e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    <FiUpload className="w-5 h-5 text-[#8F1532] stroke-[2.5]" />

                    {item.file ? (
                      <span className="font-bold text-xs sm:text-sm text-emerald-700 flex items-center gap-1">
                        <FiCheck className="w-4 h-4 stroke-[3]" />
                        {item.file.name}
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadTemplate(item.title);
                          }}
                          className="text-[#8F1532] font-semibold text-xs sm:text-sm underline hover:opacity-80 cursor-pointer"
                        >
                          Download Template
                        </button>
                        <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                          Click to Upload
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Footer CTAs: Back & Enroll -> */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTrack("training")}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-black transition-colors cursor-pointer"
                >
                  <FiArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>Back</span>
                </button>

                <Button
                  type="button"
                  variant="amber"
                  size="md"
                  disabled={isSubmitting}
                  onClick={handleEnrollSubmit}
                  className="h-11 px-7 text-white font-bold text-xs sm:text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl flex items-center gap-2"
                >
                  <span>{isSubmitting ? "Enrolling..." : "Enroll"}</span>
                  <FiArrowRight className="w-4 h-4 stroke-[3]" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
