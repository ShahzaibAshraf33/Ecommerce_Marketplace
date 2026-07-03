import React, { useRef, useCallback } from "react";
import { Controller, type Control } from "react-hook-form";
import type { OtpFormInputValues } from "../../schemas/otpSchema";

interface OtpInputProps {
  control: Control<OtpFormInputValues>;
  error?: string;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({
  control,
  error,
  length = 6,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  return (
    <Controller
      control={control}
      name="code"
      defaultValue={Array(length).fill("")}
      render={({ field: { value, onChange } }) => {
        const handleChange = (index: number, inputValue: string) => {
          // Handle paste
          if (inputValue.length > 1) {
            const digits = inputValue.replace(/\D/g, "").slice(0, length);
            const newCode = [...value];
            for (let i = 0; i < length; i++) {
              newCode[i] = digits[i] || "";
            }
            onChange(newCode);
            const nextIndex = Math.min(digits.length, length - 1);
            focusInput(nextIndex);
            return;
          }

          // Single character
          if (inputValue && !/^\d$/.test(inputValue)) return;

          const newCode = [...value];
          newCode[index] = inputValue;
          onChange(newCode);

          if (inputValue && index < length - 1) {
            focusInput(index + 1);
          }
        };

        const handleKeyDown = (
          index: number,
          e: React.KeyboardEvent<HTMLInputElement>
        ) => {
          if (e.key === "Backspace") {
            if (!value[index] && index > 0) {
              const newCode = [...value];
              newCode[index - 1] = "";
              onChange(newCode);
              focusInput(index - 1);
            } else {
              const newCode = [...value];
              newCode[index] = "";
              onChange(newCode);
            }
          } else if (e.key === "ArrowLeft" && index > 0) {
            focusInput(index - 1);
          } else if (e.key === "ArrowRight" && index < length - 1) {
            focusInput(index + 1);
          }
        };

        const handlePaste = (e: React.ClipboardEvent) => {
          e.preventDefault();
          const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
          if (pastedData) {
            const newCode = [...value];
            for (let i = 0; i < length; i++) {
              newCode[i] = pastedData[i] || "";
            }
            onChange(newCode);
            const nextIndex = Math.min(pastedData.length, length - 1);
            focusInput(nextIndex);
          }
        };

        return (
          <div>
            <div className="flex gap-3 justify-center">
              {Array.from({ length }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  autoFocus={index === 0}
                  className={`
                    w-12 h-14 text-center text-lg font-semibold rounded-xl border-2
                    transition-all duration-200 outline-none
                    ${
                      error
                        ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : value[index]
                          ? "border-violet-400 bg-violet-50/30 focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
                          : "border-gray-200 bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
                    }
                  `}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
            {error && (
              <p role="alert" className="text-xs text-red-600 text-center mt-2">
                {error}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default OtpInput;