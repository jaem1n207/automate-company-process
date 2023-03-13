import { useState } from "react";
import { toast } from "react-toastify";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      toast.error("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success("Copied to clipboard");
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      toast.error("Copy failed");
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
};
