import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/services/authService";
import { useAppDispatch } from "../app/hooks";
import { setUser, setPendingEmail } from "../features/auth/authSlice";
import { showSuccessToast, showErrorToast, getErrorMessage, getFieldErrors } from "../lib/toast";
import type { SignUpPayload } from "../types/auth";
import type { UseFormSetError } from "react-hook-form";
import type { SignUpFormValues } from "../schemas/signUpSchema";

export const useSignUpMutation = (setError: UseFormSetError<SignUpFormValues>) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SignUpPayload) => signUp(payload),
    onSuccess: (data, variables) => {
      dispatch(setUser({ user: data.user, token: data.token }));
      dispatch(setPendingEmail(variables.email));
      showSuccessToast(data.message || "Account created successfully!");
      navigate("/verify-otp");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
      const fieldErrors = getFieldErrors(error);
      if (fieldErrors) {
        (Object.entries(fieldErrors) as [keyof SignUpFormValues, string][]).forEach(
          ([field, message]) => {
            setError(field, { message });
          }
        );
      }
    },
  });
};