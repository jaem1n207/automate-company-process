import { motion } from "framer-motion";
import {
  type MouseEvent,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FormEvent,
} from "react";

export type MotionButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  onClick?: (
    event:
      | MouseEvent<HTMLButtonElement, MouseEvent>
      | FormEvent<HTMLButtonElement>
  ) => Promise<void> | void;
};

const MotionButton = motion<MotionButtonProps>("button");

export default MotionButton;
