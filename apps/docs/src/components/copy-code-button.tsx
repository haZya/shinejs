"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type CopyCodeButtonProps = {
  code: string;
};

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
  }, [code]);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isCopied]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={isCopied ? "Code copied" : "Copy code"}
      className="absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-300/70 bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm transition hover:bg-white"
    >
      {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span>{isCopied ? "Copied" : "Copy"}</span>
    </button>
  );
}
