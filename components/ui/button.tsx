"use client";

import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "ghost"
    | "link"
    | "amber";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary hover:bg-primary-hover text-white border-transparent shadow-xs",
  secondary:
    "bg-secondary hover:bg-secondary-hover text-white border-transparent shadow-xs",
  amber:
    "bg-[#f9a825] hover:bg-[#e0931b] text-white border-transparent font-bold shadow-xs",
  outline:
    "bg-white hover:bg-gray-50/80 text-text-dark border border-border-gray/80 shadow-xs",
  danger: "bg-red-600 hover:bg-red-700 text-white border-transparent shadow-xs",
  ghost:
    "bg-transparent hover:bg-gray-100 text-text-dark border-transparent shadow-xs",
  link: "bg-transparent hover:underline text-primary hover:text-primary-hover border-transparent p-0 shadow-none",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  xs: "text-xs px-3 py-1.5 gap-1.5",
  sm: "text-sm px-4 py-2 gap-2",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2.5",
  xl: "text-lg px-8 py-4 gap-3",
  icon: "p-2 gap-0",
};

const roundedStyles: Record<NonNullable<ButtonProps["rounded"]>, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = "xl",
      children,
      disabled,
      type = "button",
      onClick,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={[
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40",
          "active:scale-[0.98]",
          "disabled:opacity-50 disabled:pointer-events-none cursor-pointer whitespace-nowrap select-none",
          variantStyles[variant],
          sizeStyles[size],
          roundedStyles[rounded],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="shrink-0 inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        {children !== undefined && children !== null && children !== "" && (
          <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
            {children}
          </span>
        )}
        {!loading && rightIcon && (
          <span className="shrink-0 inline-flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
