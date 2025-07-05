import { cn } from "@/lib/utils";
import { animations, transitions } from "@/styles/design-system";
import { AnimatePresence, motion, type Variant } from "framer-motion";
import { type ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: keyof typeof animations;
  transition?: keyof typeof transitions;
  layoutId?: string;
  isPresent?: boolean;
  customVariants?: {
    initial?: Variant;
    animate?: Variant;
    exit?: Variant;
  };
}

export function MotionWrapper({
  children,
  className,
  animation = "fadeIn",
  transition = "normal",
  layoutId,
  isPresent = true,
  customVariants,
}: MotionWrapperProps) {
  const variants = customVariants || animations[animation];
  const transitionProps = transitions[transition];

  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          className={cn(className)}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout={!!layoutId}
          layoutId={layoutId}
          transition={transitionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Usage example:
// <MotionWrapper
//   animation="slideUp"
//   transition="bounce"
//   layoutId="unique-id"
//   className="your-classes"
// >
//   {children}
// </MotionWrapper>
