import axiosInstance from "../axiosInstance";
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

/**
 * Sign up user with email and password
 */
export const signUp = async (payload: SignUpPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.SIGN_UP,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Sign up failed" };
  }
};

/**
 * Verify email with OTP
 */
export const verifyEmail = async (payload: VerifyOtpPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.VERIFY_EMAIL,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Email verification failed" };
  }
};

/**
 * Resend OTP to email
 */
export const resendOTP = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.RESEND_OTP,
      { email }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to resend OTP" };
  }
};

/**
 * Sign in user with email and password
 */
export const signIn = async (payload: SignInPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.SIGN_IN,
      payload
    );
    
    // Store token in localStorage
    if (response.data.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Sign in failed" };
  }
};

/**
 * Forgot password - request reset email
 */
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to send reset email" };
  }
};

/**
 * Verify reset token
 */
export const verifyResetOTP = async (payload: VerifyOtpPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.VERIFY_RESET_OTP,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Invalid reset OTP" };
  }
};

/**
 * Reset password with OTP
 */
export const resetPassword = async (payload: {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      {
        email: payload.email,
        otp: payload.otp,
        password: payload.password,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Password reset failed" };
  }
};

/**
 * Google OAuth sign in/sign up
 */
export const googleAuth = async (idToken: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.GOOGLE_AUTH,
      { idToken }
    );

    // Store token in localStorage
    if (response.data.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Google auth failed" };
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (): Promise<any> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
    
    // Update stored token
    if (response.data.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Token refresh failed" };
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<any> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    localStorage.removeItem("accessToken");
    return response.data;
  } catch (error: any) {
    // Clear token anyway
    localStorage.removeItem("accessToken");
    throw error.response?.data || { message: "Logout failed" };
  }
};

export default {
  signUp,
  verifyEmail,
  resendOTP,
  signIn,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  googleAuth,
  refreshAccessToken,
  logout,
};