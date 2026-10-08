"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./button";
import { ASSETS_URL } from "@/assets";
import { ErrorCircleIcon } from "./svg-icons";

export type StatusModalVariant =
  | "default"
  | "save-draft-confirm"
  | "submit-application-confirm"
  | "draft-saved"
  | "application-submitted"
  | "payment-successful"
  | "payment-cancelled"
  | "payment-unsuccessful"
  | "processing-payment"
  | "submitting-application"
  | "saving-draft";

interface StatusModalProps {
  isOpen: boolean;
  onClose?: () => void;
  type?: "success" | "error";
  variant?: StatusModalVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  iconSrc?: string;
  customIcon?: React.ReactNode;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type = "success",
  variant = "default",
  title,
  description,
  actionLabel,
  onAction,
  iconSrc,
  customIcon,
}) => {
  if (!isOpen) return null;

  const renderIcon = () => {
    if (customIcon) {
      return (
        <div className="w-24 h-24 flex items-center justify-center relative shrink-0 mx-auto">
          {customIcon}
        </div>
      );
    }
    if (variant === "save-draft-confirm" || variant === "draft-saved") {
      return (
        <Image
          src={ASSETS_URL.progressSavedIcon}
          alt="Save Draft"
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    if (variant === "payment-successful") {
      return (
        <Image
          src={ASSETS_URL.paymentSuccessfulIcon}
          alt="Payment Successful"
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    if (variant === "payment-cancelled") {
      return (
        <Image
          src={ASSETS_URL.paymentCancelledIcon}
          alt="Payment Cancelled"
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    if (variant === "payment-unsuccessful") {
      return (
        <Image
          src={ASSETS_URL.paymentUnsuccessfulIcon}
          alt="Payment Unsuccessful"
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    if (
      variant === "processing-payment" ||
      variant === "submitting-application" ||
      variant === "saving-draft"
    ) {
      return (
        <Image
          src={ASSETS_URL.loadingIcon}
          alt="Loading"
          width={90}
          height={90}
          className="w-24 h-24 object-contain animate-spin my-2 shrink-0 mx-auto"
        />
      );
    }
    if (variant === "application-submitted") {
      return (
        <Image
          src={ASSETS_URL.submitedIcon}
          alt="Application Submitted"
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    if (iconSrc) {
      return (
        <Image
          src={iconSrc}
          alt={title || "Status"}
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    if (type === "success") {
      return (
        <Image
          src={ASSETS_URL.successCheckmarkImg}
          alt="Success Checkmark"
          width={90}
          height={90}
          className="w-24 h-24 object-contain shrink-0 mx-auto"
        />
      );
    }
    return (
      <div className="w-24 h-24 flex items-center justify-center bg-red-50 rounded-full border-4 border-red-100 shadow-md shrink-0 mx-auto">
        <ErrorCircleIcon />
      </div>
    );
  };

  const modalTitle =
    title ||
    (variant === "save-draft-confirm"
      ? "Save As Draft?"
      : variant === "submit-application-confirm"
        ? "Submit Application?"
        : variant === "draft-saved"
          ? "Progress Saved"
          : variant === "saving-draft"
            ? "Saving Draft"
            : variant === "submitting-application"
              ? "Submitting Application"
              : variant === "application-submitted"
                ? "Application Submitted"
                : variant === "payment-successful"
                  ? "Payment Successful"
                  : variant === "payment-cancelled"
                    ? "Payment Cancelled"
                    : variant === "payment-unsuccessful"
                      ? "Payment Unsuccessful"
                      : variant === "processing-payment"
                        ? "Processing Payment"
                        : "Success");

  const modalDescription =
    description ||
    (variant === "save-draft-confirm"
      ? "Are you sure you want to save your progress as a draft? You can safely return at any time to continue where you left off."
      : variant === "submit-application-confirm"
        ? "Are you sure you want to submit your application? Once submitted, it will be locked for review."
        : variant === "draft-saved"
          ? "Your progress has been securely saved as a draft. You can return at any time to continue."
          : variant === "payment-successful"
            ? "Your payment was made successfully"
            : variant === "payment-cancelled"
              ? "Your payment was cancelled"
              : variant === "payment-unsuccessful"
                ? "Your payment was not successful"
                : "");

  const modalActionLabel =
    actionLabel !== undefined
      ? actionLabel
      : variant === "save-draft-confirm"
        ? "Yes, Save Draft"
        : variant === "submit-application-confirm"
          ? "Yes, Submit Application"
          : variant === "payment-successful"
            ? "Continue"
            : variant === "payment-cancelled" ||
                variant === "payment-unsuccessful"
              ? "Try again"
              : "Go To Dashboard";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4">
          {renderIcon()}
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-primary tracking-tight">
          {modalTitle}
        </h2>

        {modalDescription && (
          <p className="text-neutral-secondary text-xs sm:text-sm leading-relaxed mt-2 font-normal max-w-xs">
            {modalDescription}
          </p>
        )}

        <div className="w-full flex flex-col gap-2.5 mt-6">
          {modalActionLabel && (
            <Button
              onClick={onAction || onClose}
              variant="amber"
              size="lg"
              className="w-full h-12 text-white font-bold text-sm bg-[#fbab2a] hover:bg-[#e89b1f] transition-all shadow-md cursor-pointer rounded-xl"
            >
              {modalActionLabel}
            </Button>
          )}
          {onClose && (variant === "save-draft-confirm" || variant === "submit-application-confirm") && (
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="w-full h-11 text-neutral-secondary hover:text-neutral-primary font-bold text-sm bg-white hover:bg-gray-50 border border-gray-200 transition-all cursor-pointer rounded-xl"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
