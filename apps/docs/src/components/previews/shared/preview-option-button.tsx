import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PreviewOptionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isActive?: boolean;
};

export function PreviewOptionButton({ children, className, isActive = false, type = "button", ...props }: PreviewOptionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-md border-2 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-900 transition sm:text-sm",
        isActive
          ? "border-slate-400 bg-slate-200"
          : "cursor-pointer border-slate-300 hover:border-slate-400 hover:bg-slate-100",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
