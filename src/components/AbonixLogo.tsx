import React from "react";

interface AbonixLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function AbonixLogo({
  size = "md",
  className = "",
}: AbonixLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl md:text-5xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-accent via-purple-400 to-blue-400 bg-clip-text text-transparent ${className}`}
    >
      <span className="relative">
        Abonix
        <span className="ml-1 font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Frane
        </span>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse opacity-80" />
      </span>
    </div>
  );
}
