import { Suspense } from "react";
import { ChangePassword } from "@/features/auth/pages/ChangePassword";

export const metadata = {
  title: "Change Password | ELIMI TVET",
  description: "Update your account password.",
};

export default function ChangePasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <ChangePassword />
    </Suspense>
  );
}
