const variants = {
  primary:
    "bg-leather text-white hover:bg-ink-light focus:ring-leather/50 shadow-sm",
  secondary:
    "bg-parchment text-ink border border-leather/20 hover:bg-cream focus:ring-leather/30",
  outline:
    "bg-transparent text-leather border-2 border-leather hover:bg-leather hover:text-white focus:ring-leather/30",
  sage: "bg-sage text-white hover:bg-sage/90 focus:ring-sage/50 shadow-sm",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
