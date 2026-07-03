import { axiosInstance } from "../axiosInstance";
import { AUTH_ENDPOINTS } from "../endpoints";
import type {
  SignInPayload,
  SignUpPayload,
  AuthResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ResendOtpResponse,
} from "../../types/auth";

// --- Mock delay helper ---
const mockDelay = (ms = 1500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock implementations for demo ---
const mockSignIn = async (payload: SignInPayload): Promise<AuthResponse> => {
  await mockDelay();

  if (payload.email === "error@test.com") {
    const error = {
      response: {
        status: 401,
        data: {
          message: "Invalid email or password",
          errors: { email: "No account found with this email" },
        },
      },
      isAxiosError: true,
    };
    throw error;
  }

  return {
    user: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: payload.email,
    },
    token: "mock-jwt-token-" + Date.now(),
    message: "Successfully signed in!",
  };
};

const mockSignUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
  await mockDelay();

  if (payload.email === "exists@test.com") {
    const error = {
      response: {
        status: 409,
        data: {
          message: "Email already in use",
          errors: { email: "An account with this email already exists" },
        },
      },
      isAxiosError: true,
    };
    throw error;
  }

  return {
    user: {
      id: "2",
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
    },
    token: "mock-jwt-token-" + Date.now(),
    message: "Account created successfully!",
  };
};

const mockForgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
  await mockDelay();

  if (payload.email === "notfound@test.com") {
    const error = {
      response: {
        status: 404,
        data: {
          message: "No account found with this email address",
          errors: { email: "This email is not registered" },
        },
      },
      isAxiosError: true,
    };
    throw error;
  }

  return {
    message: "Password reset link sent to your email!",
    success: true,
  };
};

const mockVerifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  await mockDelay();

  if (payload.code === "000000") {
    const error = {
      response: {
        status: 400,
        data: {
          message: "Invalid or expired OTP code",
        },
      },
      isAxiosError: true,
    };
    throw error;
  }

  return {
    message: "Account verified successfully!",
    success: true,
    token: "verified-token-" + Date.now(),
  };
};

const mockResendOtp = async (_email: string): Promise<ResendOtpResponse> => {
  await mockDelay(1000);
  return {
    message: "A new OTP code has been sent to your email",
    success: true,
  };
};

// --- Determine if we should use mocks ---
const USE_MOCKS = !import.meta.env.VITE_API_BASE_URL;

export const authService = {
  signIn: (payload: SignInPayload): Promise<AuthResponse> =>
    USE_MOCKS
      ? mockSignIn(payload)
      : axiosInstance
          .post<AuthResponse>(AUTH_ENDPOINTS.SIGN_IN, payload)
          .then((r) => r.data),

  signUp: (payload: SignUpPayload): Promise<AuthResponse> =>
    USE_MOCKS
      ? mockSignUp(payload)
      : axiosInstance
          .post<AuthResponse>(AUTH_ENDPOINTS.SIGN_UP, payload)
          .then((r) => r.data),

  forgotPassword: (
    payload: ForgotPasswordPayload
  ): Promise<ForgotPasswordResponse> =>
    USE_MOCKS
      ? mockForgotPassword(payload)
      : axiosInstance
          .post<ForgotPasswordResponse>(AUTH_ENDPOINTS.FORGOT_PASSWORD, payload)
          .then((r) => r.data),

  verifyOtp: (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> =>
    USE_MOCKS
      ? mockVerifyOtp(payload)
      : axiosInstance
          .post<VerifyOtpResponse>(AUTH_ENDPOINTS.VERIFY_OTP, payload)
          .then((r) => r.data),

  resendOtp: (email: string): Promise<ResendOtpResponse> =>
    USE_MOCKS
      ? mockResendOtp(email)
      : axiosInstance
          .post<ResendOtpResponse>(AUTH_ENDPOINTS.RESEND_OTP, { email })
          .then((r) => r.data),
};