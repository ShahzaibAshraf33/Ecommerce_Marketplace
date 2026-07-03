import React, { forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label className={`flex items-start gap-3 cursor-pointer group ${className}`}>
          <div className="relative mt-0.5 shrink-0">
            <input
              ref={ref}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div
              className={`
                w-[18px] h-[18px] rounded-[4px] border-2 flex items-center justify-center
                transition-all duration-200
                peer-checked:bg-brand peer-checked:border-brand
                peer-focus-visible:ring-2 peer-focus-visible:ring-brand/20
                ${error ? "border-red-500" : "border-gray-300 group-hover:border-gray-400"}
              `}
            >
              <Check
                size={12}
                className="text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
            {/* Overlay the checkmark visibility via CSS peer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Check
                size={12}
                className="text-white opacity-0 transition-opacity"
                strokeWidth={3}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600 select-none leading-snug">
            {label}
          </span>
        </label>
        {error && (
          <p role="alert" className="text-xs text-red-600 mt-1.5 ml-7">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;