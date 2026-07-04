import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/services/authService";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/auth/authSlice";
import { showSuccessToast, showErrorToast, getErrorMessage, getFieldErrors } from "../lib/toast";
import type { SignInPayload } from "../types/auth";
import type { UseFormSetError } from "react-hook-form";
import type { SignInFormValues } from "../schemas/signInSchema";

export const useSignInMutation = (setError: UseFormSetError<SignInFormValues>) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SignInPayload) => signIn(payload),
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, token: data.token }));
      if (data.user.email) {
        localStorage.setItem("token", data.token);
      }
      showSuccessToast(data.message || "Successfully signed in!");
      navigate("/");
    },
    onError: (error: unknown) => {
      showErrorToast(getErrorMessage(error));
      const fieldErrors = getFieldErrors(error);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          if (field === "email" || field === "password") {
            setError(field, { message });
          }
        });
      }
    },
  });
};