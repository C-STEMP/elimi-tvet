"use client";

import * as React from "react";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { ASSETS_URL } from "@/assets";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "size"> {
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  containerClassName?: string;
  textarea?: boolean;
  rows?: number;
}

const inputBaseClass = `
  w-full h-11 xl:h-12
  bg-input-bg
  text-text-dark font-normal text-sm
  border border-transparent
  rounded-radius-200
  px-3.5
  transition-all duration-200 ease-in-out
  outline-none
  placeholder:text-gray-400
  focus:border-primary-solid/40
  focus:ring-2
  focus:ring-primary-solid/10
  disabled:opacity-50
  disabled:cursor-not-allowed
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      containerClassName = "",
      type = "text",
      label,
      error,
      helperText,
      suffix,
      prefix,
      id,
      placeholder,
      disabled,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      readOnly,
      maxLength,
      required,
      autoComplete,
      autoFocus,
      name,
      textarea,
      rows,
      ...rest
    },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = id || reactId;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPasswordType = type === "password";
    const effectiveType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;

    const errorClass = error
      ? "border-primary-solid ring-2 ring-border-secondary/30"
      : "";

    const combinedInputClass = `${inputBaseClass} ${errorClass} ${className}`;

    return (
      <div
        suppressHydrationWarning
        className={`flex flex-col gap-1.5 w-full ${containerClassName}`}
      >
        {label && (
          <label
            suppressHydrationWarning
            htmlFor={inputId}
            className="font-sans text-text-dark font-medium text-xs xl:text-sm leading-[1.4] select-none"
          >
            {label}
          </label>
        )}

        <div className="relative w-full flex items-center">
          {prefix && (
            <span className="absolute left-3.5 flex items-center justify-center text-text-dark/60 select-none pointer-events-none z-10">
              {prefix}
            </span>
          )}

          {textarea ? (
            <textarea
              id={inputId}
              name={name}
              rows={rows || 3}
              placeholder={placeholder}
              disabled={disabled}
              value={value as string}
              defaultValue={defaultValue as string}
              onChange={onChange as any}
              onBlur={onBlur as any}
              onFocus={onFocus as any}
              readOnly={readOnly}
              maxLength={maxLength}
              required={required}
              autoFocus={autoFocus}
              className={`${combinedInputClass} h-auto py-2.5 ${prefix ? "pl-10" : ""}`}
            />
          ) : (
            <input
              ref={ref}
              id={inputId}
              type={effectiveType}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              readOnly={readOnly}
              maxLength={maxLength}
              required={required}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              className={`${combinedInputClass} ${prefix ? "pl-10" : ""} ${
                isPasswordType || suffix ? "pr-10" : ""
              }`}
              {...rest}
            />
          )}

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center justify-center text-text-dark/60 hover:text-text-dark transition-colors cursor-pointer select-none z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FiEye className="w-5 h-5 text-text-dark/70" />
              ) : (
                <Image
                  src={ASSETS_URL.eyeClosedIcon}
                  alt="Hide password"
                  width={20}
                  height={20}
                  className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                />
              )}
            </button>
          )}

          {!isPasswordType && suffix && (
            <span className="absolute right-3.5 flex items-center justify-center text-text-dark/60 hover:text-text-dark transition-colors cursor-pointer select-none z-10">
              {suffix}
            </span>
          )}
        </div>

        {error && (
          <span
            suppressHydrationWarning
            className="text-primary-solid text-xs font-semibold leading-[1.4] transition-all duration-200"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <div
            suppressHydrationWarning
            className="text-neutral-secondary text-xs leading-[1.4]"
          >
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
