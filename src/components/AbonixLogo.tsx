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
      className={`${sizeClasses[size]} font-black tracking-wide text-foreground ${className}`}
    >
      <span className="relative inline-flex items-baseline">
        AboFranc
        <span className="ml-1 rounded-md bg-accent px-1.5 py-0.5 text-[0.65em] font-black leading-none text-accent-foreground">
          4K
        </span>
        <span className="ml-2 hidden text-[0.42em] font-medium uppercase tracking-[0.28em] text-muted-foreground sm:inline">
          live
        </span>
        <div className="absolute -right-2 -top-1 h-2 w-2 rounded-full bg-accent opacity-90" />
      </span>
    </div>
  );
}
