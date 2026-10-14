"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface SelectOption {
  label: string;
  value: string;
  sublabel?: string;
  price?: number;
}

export interface SelectProps {
  label?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
  error?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
  name?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  error,
  helperText,
  required,
  disabled,
  className = "",
  containerClassName = "",
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const selectId = id || reactId;

  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (disabled) return;
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-1.5 w-full relative ${containerClassName}`}
    >
      {label && (
        <label
          htmlFor={selectId}
          className="font-sans text-text-dark font-medium text-xs xl:text-sm leading-[1.4] select-none"
        >
          {label}
          {required && <span className="text-primary-solid ml-0.5">*</span>}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full h-11 xl:h-12 bg-input-bg text-text-dark font-normal text-sm border rounded-radius-200 px-3.5 flex items-center justify-between transition-all outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? "border-primary-solid ring-2 ring-border-secondary/30"
            : isOpen
              ? "border-primary-solid/50 ring-2 ring-primary-solid/10 bg-white"
              : "border-transparent hover:border-gray-300"
        } ${className}`}
      >
        <span
          className={`truncate ${selectedOption ? "text-text-dark font-medium" : "text-gray-400"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary-solid" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 bg-white rounded-2xl border border-gray-100 shadow-2xl p-1.5 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {normalizedOptions.length === 0 ? (
            <div className="p-3 text-center text-xs text-gray-400">
              No options available
            </div>
          ) : (
            normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-between cursor-pointer mb-0.5 last:mb-0 ${
                    isSelected
                      ? "bg-rose-50 text-primary-solid font-semibold"
                      : "text-text-dark hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col truncate">
                    <span className="truncate">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-[11px] text-gray-400 font-normal">
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                  {opt.price !== undefined && (
                    <span className="text-xs font-bold text-gray-600 ml-2 shrink-0">
                      ₦{opt.price.toLocaleString()}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}

      {error && (
        <span className="text-primary-solid text-xs font-semibold leading-[1.4]">
          {error}
        </span>
      )}
      {!error && helperText && (
        <div className="text-neutral-secondary text-xs leading-[1.4]">
          {helperText}
        </div>
      )}
    </div>
  );
};
