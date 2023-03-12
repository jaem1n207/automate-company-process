import {
  memo,
  type PropsWithChildren,
  useState,
  type MouseEvent,
  type FormEvent,
  useMemo,
} from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import MotionButton from "./MotionButton";
import { AnimatePresence } from "framer-motion";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (
    event:
      | MouseEvent<HTMLButtonElement, MouseEvent>
      | FormEvent<HTMLButtonElement>
  ) => Promise<void> | void;
  loadingText?: string;
}

const LoadingButton = ({
  type = "button",
  className = "",
  isLoading = false,
  disabled = false,
  onClick,
  loadingText = "Loading...",
  children,
}: PropsWithChildren<LoadingButtonProps>) => {
  const [isClicked, setIsClicked] = useState(false);
  const isDisabled = useMemo(() => {
    return disabled || isLoading || isClicked;
  }, [disabled, isClicked, isLoading]);

  const handleClick = async (
    event:
      | MouseEvent<HTMLButtonElement, MouseEvent>
      | FormEvent<HTMLButtonElement>
  ) => {
    if (type === "submit" && event instanceof Event) {
      event.preventDefault();
    }

    if (!isClicked) {
      setIsClicked(true);

      try {
        await onClick?.(event);
      } catch (error) {}

      setIsClicked(false);
    }
  };

  const motionProps = isDisabled
    ? { animate: { opacity: 0.5 } }
    : {
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };

  return (
    <AnimatePresence>
      <MotionButton
        type={type}
        onClick={handleClick}
        disabled={isDisabled}
        className={`relative flex items-center justify-center gap-2 ${
          isDisabled ? "cursor-not-allowed opacity-50" : "hover:shadow-lg"
        } w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white ${className} ${
          isLoading || isClicked ? "cursor-wait" : ""
        }} ${!!disabled ? "cursor-not-allowed" : ""}`}
        {...motionProps}
      >
        {isLoading ? (
          <>
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
            <span>{loadingText}</span>
          </>
        ) : isClicked ? (
          <>
            <span>{loadingText}</span>
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <ArrowPathIcon className="h-5 w-5 animate-spin text-gray-500" />
            </div>
          </>
        ) : (
          <span>{children}</span>
        )}
      </MotionButton>
    </AnimatePresence>
  );
};

export default memo(LoadingButton);
