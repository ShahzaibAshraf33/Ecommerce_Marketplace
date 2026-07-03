import React, { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import FormField from "./FormField";

interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormField
        ref={ref}
        type={showPassword ? "text" : "password"}
        icon={Lock}
        error={error}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;