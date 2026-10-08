import { Suspense } from "react";
import GatewayPageClient from "./GatewayPageClient";

export const metadata = {
  title: "Select Role & Platform | ELIMI",
  description:
    "Choose your ELIMI platform to sign in or register: Training, CAP, Workmasters, or Organization.",
};

export default function GatewayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <GatewayPageClient />
    </Suspense>
  );
}
