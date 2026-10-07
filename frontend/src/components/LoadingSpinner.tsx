import { useGlobalContext } from "../../GlobalContext";
import { cn } from "@sglara/cn";

interface SpinnerProps {
  text?: string;
  size?: "small" | "medium";
  className?: string;
}

const LoadingSpinner = ({ text = "Loading products", size = "medium", className = "" }: SpinnerProps) => {
  const { loading } = useGlobalContext();
  if (!loading) return null;

  const sizeClasses = { small: "h-5 w-5", medium: "h-8 w-8" };
  return (
    <div className={cn("flex min-h-40 flex-col items-center justify-center gap-3 text-center", className)}>
      <span className={cn("animate-spin rounded-full border-2 border-stone-300 border-t-stone-950", sizeClasses[size])} aria-label="Loading" />
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
