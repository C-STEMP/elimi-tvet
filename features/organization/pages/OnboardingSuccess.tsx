"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PartyPopperIllustration } from "@/components/ui/svg-icons";
import { useToast } from "@/components/ui/toast";
import { saveOnboardedStatus } from "@/lib/auth-storage";

export const OnboardingSuccess: React.FC = () => {
  const router = useRouter();
  const { dismissAll } = useToast();

  useEffect(() => {
    dismissAll();
    saveOnboardedStatus(true);
  }, [dismissAll]);

  const handleGoToDashboard = () => {
    saveOnboardedStatus(true);
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[420px] mx-auto flex flex-col items-center justify-center text-center select-text py-12"
    >
      {/* Party Popper Icon */}
      <div className="mb-6 flex justify-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <PartyPopperIllustration className="w-full h-full object-contain" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-primary">
        Success
      </h1>

      <h2 className="text-base sm:text-lg font-bold text-neutral-primary mt-1">
        Your workspace is ready.
      </h2>

      <div className="text-neutral-secondary text-sm sm:text-base leading-relaxed mt-4 mb-8 font-normal max-w-sm space-y-1">
        <p>Welcome to ELIMI.</p>
        <p>Your dashboard has been configured based on your selected role.</p>
      </div>

      <div className="w-full flex flex-col gap-3.5">
        <Button
          type="button"
          onClick={handleGoToDashboard}
          variant="amber"
          size="lg"
          fullWidth
          className="h-12 sm:h-13 text-white font-bold text-base bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
        >
          Go To Dashboard
        </Button>
      </div>
    </motion.div>
  );
};
