import { Suspense } from "react";
import { CompleteSignUp } from "@/features/auth/pages/CompleteSignUp";

export const metadata = {
  title: "Complete Sign Up | ELIMI TVET",
  description: "Complete your profile registration.",
};

export default function CompleteSignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <CompleteSignUp />
    </Suspense>
  );
}
