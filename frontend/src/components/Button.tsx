import { ReactNode } from "react";
import { cn } from "@sglara/cn";

export type ButtonType = "primary" | "transparent";
export type ButtonSize = "tiny" | "small" | "medium" | "large";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  type?: ButtonType;
  buttonType?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  className = "",
  children,
  onClick,
  size = "medium",
  disabled,
  type = "primary",
  loading,
  buttonType = "button",
}: ButtonProps) => {
  const palette =
    type === "primary"
      ? "bg-stone-950 text-white hover:bg-stone-800"
      : "border border-stone-300 bg-transparent text-stone-900 hover:border-stone-950 hover:bg-stone-950 hover:text-white";

  const sizes = {
    tiny: "px-4 py-2 text-xs",
    small: "px-4 py-2 text-xs",
    medium: "px-6 py-3 text-sm",
    large: "px-8 py-3.5 text-sm",
  };

  return (
    <button
      type={buttonType}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.08em] transition-all duration-200",
        palette,
        sizes[size],
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {children}
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
    </button>
  );
};

export default Button;
