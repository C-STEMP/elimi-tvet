"use client";

import React, { useState } from "react";
import type { StaticImageData } from "next/image";
import { FiUser } from "react-icons/fi";

export interface AvatarProps {
  src?: string | StaticImageData | null;
  name?: string;
  alt?: string;
  seed?: string;
  size?: number | string;
  className?: string;
  shape?: "circle" | "rounded" | "square";
  style?: React.CSSProperties;
}

export const getInitials = (name?: string): string => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "",
  alt,
  size,
  className = "",
  shape = "circle",
  style,
}) => {
  const [hasImageError, setHasImageError] = useState(false);

  const resolvedSrc =
    typeof src === "object" && src !== null && "src" in src
      ? (src as StaticImageData).src
      : typeof src === "string" && src.trim() !== ""
      ? src
      : null;

  const displayAlt = alt || name || "User Avatar";
  const initials = getInitials(name);

  const shapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none",
  }[shape];

  const sizeStyles: React.CSSProperties = size
    ? typeof size === "number"
      ? { width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }
      : { width: size, height: size, minWidth: size, minHeight: size }
    : {};

  if (resolvedSrc && !hasImageError) {
    return (
      <div
        className={`relative overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 ${shapeClasses} ${className}`}
        style={{ ...sizeStyles, ...style }}
      >
        <img
          src={resolvedSrc}
          alt={displayAlt}
          className="w-full h-full object-cover block"
          onError={() => setHasImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-tr from-[#8F1532] to-[#E11D48] text-white font-bold flex items-center justify-center shrink-0 shadow-xs ${shapeClasses} ${className}`}
      style={{ ...sizeStyles, ...style }}
    >
      {initials ? (
        <span className="text-xs sm:text-sm select-none tracking-wider">
          {initials}
        </span>
      ) : (
        <FiUser className="w-1/2 h-1/2 text-white/90" />
      )}
    </div>
  );
};
