"use client";

import React, { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getQueryClient } from "@/lib/query-client";
import { ToastProvider } from "@/components/ui/toast";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "987821260581-0oa3ltgm7muu6s1sjuk38quam65op9nn.apps.googleusercontent.com";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
