const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  // 🎨 variant styles
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-800 text-white",
    success: "bg-green-600 hover:bg-green-800 text-white",
    danger: "bg-red-600 hover:bg-red-800 text-white",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  // 📏 sizes
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        rounded transition
        ${variants[variant] || variants.primary}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${(disabled || loading) ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {/* 🔄 Loading */}
      {loading && (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      )}

      {/* ⬅️ Left Icon */}
      {!loading && leftIcon && <span>{leftIcon}</span>}

      {/* 📝 Text */}
      <span>{children}</span>

      {/* ➡️ Right Icon */}
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;