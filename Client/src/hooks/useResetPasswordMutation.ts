import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/services/authService";
import { clearPendingEmail, clearPendingResetOtp } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { showSuccessToast, showErrorToast, getErrorMessage } from "../lib/toast";
import type { ResetPasswordPayload } from "../types/auth";

export const useResetPasswordMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: (data) => {
      dispatch(clearPendingEmail());
      dispatch(clearPendingResetOtp());
      showSuccessToast(data.message || "Password reset successfully");
      navigate("/marketplace");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/services/authService";
import { useAppDispatch } from "../app/hooks";
import { clearPendingEmail, clearPendingResetOtp } from "../features/auth/authSlice";
import { showSuccessToast, showErrorToast, getErrorMessage, getFieldErrors } from "../lib/toast";
import type { ResetPasswordPayload } from "../types/auth";
import type { UseFormSetError } from "react-hook-form";
import type { ResetPasswordFormValues } from "../schemas/resetPasswordSchema";

export const useResetPasswordMutation = (
  setError: UseFormSetError<ResetPasswordFormValues>
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: (data) => {
      dispatch(clearPendingEmail());
      dispatch(clearPendingResetOtp());
      showSuccessToast(data.message || "Password reset successfully!");
      navigate("/marketplace");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
      const fieldErrors = getFieldErrors(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field as keyof ResetPasswordFormValues, { message });
        });
      }
    },
  });
};
