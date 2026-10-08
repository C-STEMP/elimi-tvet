"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiX } from "react-icons/fi";
import { clearTokens } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const router = useRouter();

  const handleConfirmLogout = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      clearTokens();
      router.push("/login");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 select-none overflow-hidden text-center flex flex-col items-center"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="mb-4 w-12 h-12 rounded-xl bg-rose-50 text-[#8F1532] hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer mx-auto"
            >
              <FiX className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Content */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-text-dark tracking-tight text-center">
              Confirm Sign Out
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal text-center mx-auto max-w-xs">
              Are you sure you want to log out of your organization account? You will need to sign in again to access your dashboard.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 w-full grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm sm:text-base hover:bg-gray-50 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="w-full py-3 rounded-xl bg-[#8F1532] hover:bg-[#75152b] active:scale-98 text-white font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <FiLogOut className="w-4 h-4" />
                Yes, Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
