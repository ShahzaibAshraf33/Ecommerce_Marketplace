export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  googleId?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    isNewUser?: boolean;
  };
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string;
}

export interface VerifyOtpResponse {
  message: string;
  success: boolean;
  data?: {
    id: number;
    email: string;
    emailVerified: boolean;
  };
}

export interface ResendOtpResponse {
  message: string;
  success: boolean;
  expiresAt?: string;
}

export interface ResendOtpResponse {
  message: string;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>;
}