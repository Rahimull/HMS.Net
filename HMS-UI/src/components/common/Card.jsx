import React from "react";
import { cn } from "@/lib/utils";

/* ================= BASE CARD ================= */
export const Card = ({
  children,
  className = "",
  hover = true,
  variant = "default",
  padding = "md",
  ...props
}) => {
  const variants = {
    default: "bg-white border border-gray-200",
    soft: "bg-gray-50 border border-gray-200",
    outline: "bg-white border border-gray-300",
  };

  const paddings = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        /* ================= BASE STYLE ================= */
        "rounded-2xl transition-all duration-200 ease-out",

        /* ================= STRUCTURE ================= */
        variants[variant],
        paddings[padding],

        /* ================= DEPTH ================= */
        "shadow-sm",

        /* ================= YOUR FAVORITE STYLE ================= */
        hover &&
          "hover:-translate-y-1 hover:shadow-md hover:border-gray-300",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* ================= HEADER ================= */
export const CardHeader = ({ children, className = "" }) => (
  <div
    className={cn(
      "mb-2 text-sm font-semibold text-gray-900",
      className
    )}
  >
    {children}
  </div>
);

/* ================= CONTENT ================= */
export const CardContent = ({ children, className = "" }) => (
  <div
    className={cn(
      "text-sm text-gray-600",
      className
    )}
  >
    {children}
  </div>
);

/* ================= FOOTER ================= */
export const CardFooter = ({ children, className = "" }) => (
  <div
    className={cn(
      "mt-3 flex items-center justify-between",
      className
    )}
  >
    {children}
  </div>
);