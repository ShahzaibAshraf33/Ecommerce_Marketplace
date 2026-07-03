import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/authService";
import { useAppDispatch } from "../app/hooks";
import { clearPendingEmail } from "../features/auth/authSlice";
import { showSuccessToast, showErrorToast, getErrorMessage } from "../lib/toast";
import type { VerifyOtpPayload } from "../types/auth";

export const useVerifyOtpMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: (data) => {
      dispatch(clearPendingEmail());
      showSuccessToast(data.message || "Account verified!");
      navigate("/sign-in");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authService.resendOtp(email),
    onSuccess: (data) => {
      showSuccessToast(data.message || "OTP resent!");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};