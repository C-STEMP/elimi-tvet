import { Suspense } from "react";
import { EnterOtpEmail } from "@/features/auth/pages/EnterOtpEmail";

export const metadata = {
  title: "Enter Code | ELIMI TVET",
  description: "Enter your verification code.",
};

export default function EnterOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <EnterOtpEmail />
    </Suspense>
  );
}
