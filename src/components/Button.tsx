import { ReactNode } from "react";
import { cn } from "../../lib/utils";

const Button = ({
  icon,
  children,
  className,
  onClick,
  ...props
}: {
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  
  return (
    <>
        <button
          className={cn("flex items-center justify-center", className)}
          onClick={onClick}
          {...props}
        >
          {icon}
          <span>{children}</span>
        </button>
    </>
  );
};

export default Button;
