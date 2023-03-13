import { type Variants, motion } from "framer-motion";
import { type ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

interface AnimatedContainerProps {
  children: ReactNode;
}

const AnimatedContainer = ({ children }: AnimatedContainerProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
