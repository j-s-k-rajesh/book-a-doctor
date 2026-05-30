import React from "react";

const Button = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        group relative overflow-hidden
        inline-flex items-center justify-center gap-2
        
        px-6 py-3.5
        rounded-2xl
        
        bg-lime-900
        text-white
        font-semibold
        tracking-wide
        
        shadow-lg shadow-emerald-600/20
        
        transition-all duration-300 ease-out
        
        hover:bg-gray-800
        hover:-translate-y-1
        hover:shadow-2xl hover:shadow-emerald-600/30
        
        active:translate-y-0
        active:scale-95
        
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        
        ${className}
      `}
      {...props}
    >
      {/* Shine Effect */}
      <span
        className="
          absolute inset-0
          -translate-x-full
          bg-linear-to-r
          from-transparent
          via-white/20
          to-transparent
          skew-x-12
          group-hover:translate-x-[200%]
          transition-transform
          duration-1000
        "
      />

      {loading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />
            <path
              d="M22 12A10 10 0 0 1 12 22"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>

          <span className="relative z-10">
            Please wait...
          </span>
        </>
      ) : (
        <span className="relative z-10 flex items-center gap-2">
          {children}

          <svg
            className="
              w-4 h-4
              transition-transform duration-300
              group-hover:translate-x-1
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-6-6 6 6-6 6"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

export default Button;