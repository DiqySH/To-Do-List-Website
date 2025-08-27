import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import ErrorMessage from "./ErrorMessage";

interface InputProps {
  label?: string;
  className?: string;
  type?: string;
  error?: ReactNode;
  defaultValue?: string;
}

const Input = ({ label, className, type, error, defaultValue, ...props }: InputProps) => {
  return (
    <label className="flex flex-col text-[14px] w-full">
      <span>{label}</span>
      <input
        type={type}
        className={cn("flex flex-col", className)}
        defaultValue={defaultValue}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </label>
  );
};

export default Input;
