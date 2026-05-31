import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  label,
  error,
  className = "",
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          className={`
            w-full
            px-4
            py-3.5
            ${isPassword ? "pr-12" : ""}

            rounded-2xl

            bg-slate-900
            border border-slate-700

            text-white
            placeholder:text-slate-500

            outline-none

            transition-all duration-300

            focus:border-lime-500
            focus:ring-4
            focus:ring-lime-500/10

            hover:border-slate-600

            ${error ? "border-red-500" : ""}

            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2

              text-slate-400
              hover:text-lime-400

              transition-colors
            "
          >
            {showPassword ? (
              <FiEyeOff size={20} />
            ) : (
              <FiEye size={20} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;