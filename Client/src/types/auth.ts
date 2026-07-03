export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
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
  code: string;
}

export interface VerifyOtpResponse {
  message: string;
  success: boolean;
  token?: string;
}

export interface ResendOtpResponse {
  message: string;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>;
}