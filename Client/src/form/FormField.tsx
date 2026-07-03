import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
  rightElement?: React.ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ icon: Icon, error, rightElement, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon
                size={18}
                className={error ? "text-red-400" : "text-gray-400"}
              />
            </div>
          )}
          <input
            ref={ref}
            className={`
              auth-input-base
              ${Icon ? "pl-11" : "pl-4"}
              ${rightElement ? "pr-11" : "pr-4"}
              ${
                error
                  ? "border-red-500 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 hover:border-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
              }
              ${className}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.name}-error` : undefined}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            error ? "max-h-8 opacity-100 mt-1.5" : "max-h-0 opacity-0"
          }`}
        >
          {error && (
            <p
              id={`${props.name}-error`}
              role="alert"
              className="text-xs text-red-600 flex items-center gap-1"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="shrink-0"
              >
                <circle cx="6" cy="6" r="6" fill="#DC2626" />
                <path
                  d="M6 3.5V6.5M6 8V8.5"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;