export const AUTH_ENDPOINTS = {
  // Authentication
  SIGN_UP: "/auth/signup",
  SIGN_IN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",

  // Email Verification (OTP)
  VERIFY_EMAIL: "/auth/verify-email",
  RESEND_OTP: "/auth/resend-otp",

  // Password Recovery
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_RESET_OTP: "/auth/verify-reset-otp",
  RESET_PASSWORD: "/auth/reset-password",

  // Google OAuth
  GOOGLE_AUTH: "/auth/google",
} as const;