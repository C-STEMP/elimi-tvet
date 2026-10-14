"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ASSETS_URL } from "@/assets";
import { TransactionReceiptData } from "@/features/settings/types/settings.types";

interface ReceiptModalProps {
  isOpen: boolean;
  transaction: TransactionReceiptData | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  transaction,
  onClose,
}) => {
  if (!isOpen || !transaction) return null;

  const handleDownloadOrPrint = () => {
    const el = document.getElementById("transaction-receipt-content");
    if (!el) {
      window.print();
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const styles = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']")
    )
      .map((s) => s.outerHTML)
      .join("\n");

    doc.open();
    doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Transaction Receipt - ${transaction.transactionId}</title>
  ${styles}
  <style>
    @page { margin: 12mm; size: auto; }
    body {
      background: #ffffff !important;
      margin: 0;
      padding: 24px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      justify-content: center;
      color: #1f2937;
    }
    .receipt-print-wrapper {
      width: 100%;
      max-width: 440px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 20px;
      padding: 24px;
    }
    @media print {
      body { padding: 0 !important; }
      .receipt-print-wrapper { border: none !important; padding: 0 !important; }
      button, .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="receipt-print-wrapper">
    ${el.innerHTML}
  </div>
</body>
</html>`);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2000);
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 select-none overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative flex flex-col items-center my-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-primary/10 text-primary hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div
            id="transaction-receipt-content"
            className="w-full flex flex-col items-center gap-4 mt-2 sm:mt-8"
          >
            {/* Header Box */}
            <div className="bg-red-50/70 p-5 rounded-2xl w-full flex flex-col items-center justify-center gap-2.5 text-center border border-red-100/70">
              <div className="relative w-28 h-8">
                <Image
                  src={ASSETS_URL.logoIcon2}
                  alt="Elimi Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#8F1532] tracking-tight">
                Transaction Reciept
              </h3>
            </div>

            {/* Metadata Grid */}
            <div className="bg-[#F8F9FA] p-3.5 rounded-2xl w-full grid grid-cols-2 gap-3 text-xs text-left border border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-medium">Date</span>
                <span className="font-bold text-neutral-primary mt-0.5">
                  {transaction.date}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-medium">Transaction ID</span>
                <span className="font-bold text-neutral-primary mt-0.5 truncate" title={transaction.transactionId}>
                  {transaction.transactionId}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-medium">Payment Method</span>
                <span className="font-medium text-neutral-primary mt-0.5">
                  {transaction.paymentMethod}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-medium">Status</span>
                <span className="font-bold text-[#1E7F4C] mt-0.5">
                  {transaction.status === "Paid" ? "Completed" : transaction.status}
                </span>
              </div>
            </div>

            {/* Line Item Card */}
            <div className="bg-[#F8F9FA] p-4 rounded-2xl w-full flex items-center justify-between gap-4 text-xs border border-gray-100">
              <div className="flex flex-col text-left">
                <span className="font-bold text-neutral-primary text-sm">
                  {transaction.assessmentType}
                </span>
                <span className="text-[11px] text-neutral-secondary font-medium mt-0.5">
                  {transaction.description}
                </span>
              </div>
              <span className="font-extrabold text-neutral-primary text-sm sm:text-base shrink-0">
                {transaction.amountPaid}
              </span>
            </div>

            {/* Summary Lines */}
            <div className="w-full flex flex-col gap-2 text-xs sm:text-sm text-left px-1">
              <div className="flex items-center justify-between text-neutral-secondary">
                <span>Name</span>
                <span className="font-semibold text-neutral-primary">{transaction.candidateName}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-secondary">
                <span>Vat</span>
                <span className="font-medium text-neutral-primary">-</span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <span className="text-base sm:text-lg font-bold text-neutral-primary">
                  TOTAL
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-neutral-primary">
                  {transaction.amountPaid}
                </span>
              </div>
            </div>

            {/* Download Button */}
            <Button
              type="button"
              onClick={handleDownloadOrPrint}
              variant="amber"
              className="w-full h-12 text-white font-bold text-sm bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl mt-1"
            >
              Download
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
