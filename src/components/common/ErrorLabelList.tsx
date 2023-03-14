import React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { type Validator } from "@/models/validator";

type ListProps<T> = {
  validator:
    | Validator<T>
    | {
        isError: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validateInput: (value: T) => void;
        validators: Validator<T>[];
      };
};

const ErrorLabelList = <T,>({ validator }: ListProps<T>) => {
  const errorListVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ul className="mt-1 flex flex-col space-y-1">
      <AnimatePresence>
        {validators.map((validator, index) =>
          validator.isError ? (
            <motion.li
              key={index}
              variants={errorListVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-red-500"
            >
              {validator.errorMessage}
            </motion.li>
          ) : null
        )}
      </AnimatePresence>
    </ul>
  );
};

export default ErrorLabelList;
