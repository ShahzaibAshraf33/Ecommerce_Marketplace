import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verifyEmail, verifyResetOTP, resendOTP } from "../api/services/authService";
import { useAppDispatch } from "../app/hooks";
import { clearPendingEmail, setPendingResetOtp } from "../features/auth/authSlice";
import { showSuccessToast, showErrorToast, getErrorMessage } from "../lib/toast";
import type { VerifyOtpPayload } from "../types/auth";

export type VerifyOtpMode = "verify" | "reset";

export const useVerifyOtpMutation = (mode: VerifyOtpMode = "verify") => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) =>
      mode === "reset" ? verifyResetOTP(payload) : verifyEmail(payload),
    onSuccess: (data, variables) => {
      if (mode === "reset") {
        dispatch(setPendingResetOtp((variables as VerifyOtpPayload).otp));
        showSuccessToast(data.message || "OTP verified. You can now reset your password.");
        navigate("/reset-password");
      } else {
        dispatch(clearPendingEmail());
        showSuccessToast(data.message || "Account verified!");
        navigate("/marketplace");
      }
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: (email: string) => resendOTP(email),
    onSuccess: (data) => {
      showSuccessToast(data.message || "OTP resent!");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};