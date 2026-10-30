"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { CredentialResponse } from "@react-oauth/google";
import {
  saveTokens,
  clearTokens,
  saveOnboardedStatus,
  getOnboardedStatus,
  saveUser,
  getRefreshToken,
} from "@/lib/auth-storage";
import { useToast } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/client";
import {
  registerApi,
  type RegisterPayload,
  verifyAccountApi,
  type VerifyAccountPayload,
  resendOtpApi,
  type ResendOtpPayload,
  loginApi,
  type LoginPayload,
  forgotPasswordApi,
  type ForgotPasswordPayload,
  resetPasswordApi,
  type ResetPasswordPayload,
  changePasswordApi,
  type ChangePasswordPayload,
  logoutApi,
  googleAuthApi,
} from "@/features/auth/api/auth.api";

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),

    onSuccess: (_data, variables) => {
      toast({
        type: "info",
        title: "Check Your Email",
        description:
          "We've sent a 4-digit verification code to your email address.",
      });
      router.push(`/verify?email=${encodeURIComponent(variables.email)}`);
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 409) {
          toast({
            type: "error",
            title: "Email Already Registered",
            description:
              "This email is already in use. Try signing in instead.",
          });
        } else if (error.statusCode === 422) {
          toast({
            type: "error",
            title: "Validation Error",
            description: error.message,
          });
        } else {
          toast({
            type: "error",
            title: "Registration Failed",
            description: error.message,
          });
        }
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Unable to connect. Please try again.",
        });
      }
    },
  });
}

export function useVerifyAccount() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: VerifyAccountPayload) => verifyAccountApi(payload),

    onSuccess: (data) => {
      saveTokens(data.accessToken, data.refreshToken);
      saveOnboardedStatus(false);
      saveUser({
        userId: data.user.userId || data.user.id || "",
        email: data.user.email,
        status: data.user.status,
        intents: data.user.intents || [],
        createdAt: data.user.createdAt || new Date().toISOString(),
      });

      toast({
        type: "success",
        title: "Email Verified!",
        description: "Your account has been created successfully.",
      });
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast({
          type: "error",
          title: "Verification Failed",
          description: error.message,
        });
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Unable to connect. Please try again.",
        });
      }
    },
  });
}

export function useResendOtp() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendOtpApi(payload),

    onSuccess: () => {
      toast({
        type: "success",
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      });
    },

    onError: (error: Error) => {
      if (error instanceof ApiError && error.statusCode === 429) {
        toast({
          type: "error",
          title: "Too Many Requests",
          description: "Please wait before requesting another code.",
        });
      } else {
        toast({
          type: "error",
          title: "Resend Failed",
          description: "Could not resend the code. Please try again.",
        });
      }
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),

    onSuccess: async (data, variables) => {
      saveTokens(data.accessToken, data.refreshToken);
      saveUser({
        userId: data.user.userId || data.user.id || "",
        email: data.user.email || variables.email,
        status: data.user.status,
        intents: data.user.intents || [],
        createdAt: data.user.createdAt || new Date().toISOString(),
      });

      toast({
        type: "success",
        title: "Welcome Back!",
        description: `Signed in as ${data.user.email || variables.email}`,
      });

      const isOnboarded = getOnboardedStatus();
      if (isOnboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          toast({
            type: "error",
            title: "Invalid Credentials",
            description: "Incorrect email or password.",
          });
        } else if (error.statusCode === 404) {
          toast({
            type: "error",
            title: "Account Not Found",
            description: "No account found with this email. Please register.",
          });
        } else {
          toast({
            type: "error",
            title: "Sign In Failed",
            description: error.message,
          });
        }
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Unable to connect. Please try again.",
        });
      }
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPasswordApi(payload),

    onSuccess: (_data, variables) => {
      toast({
        type: "info",
        title: "Reset Code Sent",
        description:
          "We've sent a 4-digit password reset code to your email.",
      });
      router.push(
        `/verify?email=${encodeURIComponent(variables.email)}&purpose=password_reset`,
      );
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast({
          type: "error",
          title: "Request Failed",
          description: error.message,
        });
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Unable to connect. Please try again.",
        });
      }
    },
  });
}

export function useResetPassword() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPasswordApi(payload),

    onSuccess: () => {
      toast({
        type: "success",
        title: "Password Updated",
        description:
          "Your password has been reset successfully. Please sign in.",
      });
      router.push("/login");
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast({
          type: "error",
          title: "Reset Failed",
          description: error.message,
        });
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Unable to connect. Please try again.",
        });
      }
    },
  });
}

export function useChangePassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePasswordApi(payload),

    onSuccess: () => {
      toast({
        type: "success",
        title: "Password Changed",
        description: "Your password has been changed successfully.",
      });
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast({
          type: "error",
          title: "Change Failed",
          description: error.message,
        });
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Unable to connect. Please try again.",
        });
      }
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          await logoutApi({ refreshToken });
        } catch {
          // Ignore network logout errors
        }
      }
      clearTokens();
    },

    onSuccess: () => {
      toast({
        type: "info",
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
      router.push("/login");
    },
  });
}

export function useGoogleAuth() {
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (idToken: string) => googleAuthApi({ idToken, intents: ["cap", "lms"] }),

    onSuccess: (data) => {
      saveTokens(data.accessToken, data.refreshToken);
      saveUser({
        userId: data.user.userId || data.user.id || "",
        email: data.user.email,
        status: data.user.status,
        intents: data.user.intents || [],
        createdAt: data.user.createdAt || new Date().toISOString(),
      });

      toast({
        type: "success",
        title: "Welcome!",
        description: `Signed in as ${data.user.email}`,
      });

      if (data.isNewUser || !getOnboardedStatus()) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    },

    onError: (error: Error) => {
      if (error instanceof ApiError) {
        toast({
          type: "error",
          title: "Google Sign-In Failed",
          description: error.message,
        });
      } else {
        toast({
          type: "error",
          title: "Network Error",
          description: "Could not connect with Google. Please try again.",
        });
      }
    },
  });

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      mutation.mutate(credentialResponse.credential);
    } else {
      toast({
        type: "error",
        title: "Google Sign-In Failed",
        description: "No credentials received from Google.",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      type: "error",
      title: "Google Sign-In Cancelled",
      description: "Google sign-in was closed or failed.",
    });
  };

  return {
    handleGoogleSuccess,
    handleGoogleError,
    isPending: mutation.isPending,
  };
}
