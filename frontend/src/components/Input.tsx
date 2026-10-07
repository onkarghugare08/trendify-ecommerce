import { cn } from "@sglara/cn";

export type InputSize = "tiny" | "small" | "medium" | "large";
export type InputType = "checkbox" | "password" | "email" | "number" | "text";

interface InputProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  htmlType: InputType;
  name?: string;
  size: InputSize;
  checked?: boolean;
  label?: string;
  value?: string | number;
  required?: boolean;
  inputClassName?: string;
  wrapperClassName?: string;
  min?: number;
  max?: number;
}

const Input = ({
  placeholder,
  checked,
  onChange,
  htmlType = "text",
  inputClassName = "",
  wrapperClassName = "",
  name,
  size,
  label,
  value,
  required,
  min,
  max,
}: InputProps) => {
  const sizes = {
    tiny: "h-4 w-4 accent-stone-950",
    small: "rounded-xl border border-stone-300 px-2 py-1.5 text-sm",
    medium: "rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900",
    large: "rounded-2xl border border-stone-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-stone-900",
  };

  return (
    <label className={cn("flex cursor-text items-center gap-2", htmlType === "checkbox" && "cursor-pointer", wrapperClassName)}>
      <input
        placeholder={placeholder}
        checked={checked}
        onChange={onChange}
        type={htmlType}
        name={name}
        value={value}
        required={required}
        min={min}
        max={max}
        className={cn(sizes[size], inputClassName)}
      />
      {label && <span className="text-sm text-stone-600">{label}</span>}
    </label>
  );
};

export default Input;
