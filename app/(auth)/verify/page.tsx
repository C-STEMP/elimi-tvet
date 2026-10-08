import { Suspense } from "react";
import { VerifyEmail } from "@/features/auth/pages/VerifyEmail";

export const metadata = {
  title: "Verify Email | ELIMI TVET",
  description: "Verify your email address.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <VerifyEmail />
    </Suspense>
  );
}
