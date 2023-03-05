import { useEffect, useRef, useState } from "react";

export const useFocus = <T extends HTMLElement>(initialState = false) => {
  const inputRef = useRef<T>(null);
  const [isFocused, setIsFocused] = useState(initialState);

  useEffect(() => {
    if (!inputRef.current) return;

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    if (isFocused) {
      inputRef.current.focus();
    }

    inputRef.current.addEventListener("focus", onFocus);
    inputRef.current.addEventListener("blur", onBlur);

    return () => {
      if (!inputRef.current) return;
      inputRef.current.removeEventListener("focus", onFocus);
      inputRef.current.removeEventListener("blur", onBlur);
    };
  }, [isFocused]);

  return {
    inputRef,
    isFocused,
    setIsFocused,
  };
};
