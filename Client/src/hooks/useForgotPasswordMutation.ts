import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/services/authService";
import { useAppDispatch } from "../app/hooks";
import { setPendingEmail } from "../features/auth/authSlice";
import { showSuccessToast, showErrorToast, getErrorMessage, getFieldErrors } from "../lib/toast";
import type { ForgotPasswordPayload } from "../types/auth";
import type { UseFormSetError } from "react-hook-form";
import type { ForgotPasswordFormValues } from "../schemas/forgotPasswordSchema";

export const useForgotPasswordMutation = (
  setError: UseFormSetError<ForgotPasswordFormValues>
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      forgotPassword(payload),
    onSuccess: (data, variables) => {
      dispatch(setPendingEmail(variables.email));
      showSuccessToast(data.message || "Reset OTP sent!");
      navigate("/verify-otp?mode=reset");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
      const fieldErrors = getFieldErrors(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          if (field === "email") {
            setError(field, { message });
          }
        });
      }
    },
  });
};