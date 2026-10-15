import { useState, useRef, useEffect } from "react";

interface UseCopyToClipboardOptions {
  duration?: number;
}

interface UseCopyToClipboardResult {
  copy: (text: string) => Promise<void>;
  showCopied: boolean;
}

export const useCopyToClipboard = (
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardResult => {
  const { duration = 2000 } = options;
  const [showCopied, setShowCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      setShowCopied(true);
      timerRef.current = window.setTimeout(() => {
        setShowCopied(false);
        timerRef.current = null;
      }, duration);
    } catch (err) {
      console.error("Не удалось скопировать:", err);
    }
  };

  return { copy, showCopied };
};
