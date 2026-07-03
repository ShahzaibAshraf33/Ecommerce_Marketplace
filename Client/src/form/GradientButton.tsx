import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`
        auth-button-primary relative w-full h-[48px] rounded-input text-white font-semibold text-sm
        flex items-center justify-center gap-2
        transition-all duration-300 overflow-hidden
        disabled:opacity-70 disabled:cursor-not-allowed
        hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98]
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      <span
        className={`transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </span>
      <span
        className={`absolute right-4 transition-all duration-200 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <ArrowRight size={18} />
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={20} className="animate-spin" />
        </span>
      )}
    </button>
  );
};

export default GradientButton;