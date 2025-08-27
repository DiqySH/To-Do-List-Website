import { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <span className="text-[14px] text-red-500">{children}</span>;
};

export default ErrorMessage;
