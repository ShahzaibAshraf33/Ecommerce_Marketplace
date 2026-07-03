import toast from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 4000,
    style: {
      background: "#DCFCE7",
      color: "#166534",
      border: "1px solid #BBF7D0",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 500,
    },
    iconTheme: {
      primary: "#16A34A",
      secondary: "#DCFCE7",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 5000,
    style: {
      background: "#FEF2F2",
      color: "#991B1B",
      border: "1px solid #FECACA",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 500,
    },
    iconTheme: {
      primary: "#DC2626",
      secondary: "#FEF2F2",
    },
  });
};

interface AxiosLikeError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosLikeError;
  if (axiosError?.response?.data?.message) {
    return axiosError.response.data.message;
  }
  if (axiosError?.message) {
    return axiosError.message;
  }
  return "Something went wrong. Please try again.";
};

interface AxiosFieldError {
  response?: {
    data?: {
      errors?: Record<string, string>;
    };
  };
}

export const getFieldErrors = (
  error: unknown
): Record<string, string> | null => {
  const axiosError = error as AxiosFieldError;
  if (axiosError?.response?.data?.errors) {
    return axiosError.response.data.errors;
  }
  return null;
};