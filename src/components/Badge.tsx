import { ReactNode } from "react";

const Badge = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className={
        children === "To do"
          ? "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 w-fit"
          : children === "In Progress"
          ? "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 w-fit"
          : children === "Done"
          ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 w-fit"
          : "w-fit"
      }
    >
      {children}
    </span>
  );
};

export default Badge;
