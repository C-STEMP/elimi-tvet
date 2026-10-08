"use client";

import * as React from "react";
import { FiPhone } from "react-icons/fi";

export interface PhoneInputProps {
  label?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (countryName: string) => void;
  error?: string;
  helperText?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  containerClassName?: string;
  className?: string;
  id?: string;
  name?: string;
  defaultCountry?: string;
}

const COUNTRY_DIAL_CODES: { name: string; code: string; dial: string; flag: string }[] = [
  { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
  { name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭" },
  { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value = "",
  onChange,
  onCountryChange,
  error,
  helperText,
  placeholder = "8012345678",
  disabled = false,
  containerClassName = "",
  className = "",
  id,
  name,
  defaultCountry = "NG",
}) => {
  const inputId = id || React.useId();
  const [selectedCountry, setSelectedCountry] = React.useState(
    () => COUNTRY_DIAL_CODES.find((c) => c.code === defaultCountry) || COUNTRY_DIAL_CODES[0]
  );

  // Strip country dial code if already in value for display
  const cleanNumber = value.startsWith(selectedCountry.dial)
    ? value.slice(selectedCountry.dial.length).trim()
    : value.replace(/^\+?[0-9]{1,3}/, "").trim();

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = COUNTRY_DIAL_CODES.find((c) => c.code === e.target.value);
    if (found) {
      setSelectedCountry(found);
      onCountryChange?.(found.name);
      if (cleanNumber) {
        onChange?.(`${found.dial}${cleanNumber}`);
      }
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    if (raw) {
      onChange?.(`${selectedCountry.dial}${raw}`);
    } else {
      onChange?.("");
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans text-neutral-primary font-medium text-xs xl:text-sm leading-[1.4] select-none"
        >
          {label}
        </label>
      )}

      <div
        className={`
          relative w-full flex items-center h-11 xl:h-12
          bg-[#F8F9FA] border rounded-xl
          transition-all duration-200 ease-in-out
          ${
            error
              ? "border-red-500 ring-2 ring-red-100"
              : "border-gray-200/80 focus-within:border-[#8F1532]/40 focus-within:ring-2 focus-within:ring-[#8F1532]/10"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex items-center pl-3 pr-1 shrink-0 border-r border-gray-200">
          <span className="text-base mr-1">{selectedCountry.flag}</span>
          <select
            value={selectedCountry.code}
            onChange={handleCountrySelect}
            disabled={disabled}
            className="bg-transparent text-xs font-semibold text-neutral-primary outline-none cursor-pointer pr-1"
          >
            {COUNTRY_DIAL_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.dial}
              </option>
            ))}
          </select>
        </div>

        <input
          id={inputId}
          name={name || "phone"}
          type="tel"
          value={cleanNumber}
          onChange={handleNumberChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="tel"
          className={`
            w-full h-full bg-transparent px-3
            text-neutral-primary font-medium text-xs xl:text-sm
            outline-none placeholder:text-gray-400
            ${className}
          `}
        />
      </div>

      {error && (
        <span className="text-red-600 text-xs font-semibold leading-[1.4]">
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

PhoneInput.displayName = "PhoneInput";
