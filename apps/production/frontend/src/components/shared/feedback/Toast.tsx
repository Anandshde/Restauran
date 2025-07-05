import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { X } from "lucide-react";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        destructive: "group destructive border-red-500 bg-red-500 text-white",
        success: "group success border-green-500 bg-green-500 text-white",
        warning: "group warning border-yellow-500 bg-yellow-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}

const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export function Toast({ className, variant, children, onClose }: ToastProps) {
  return (
    <motion.div
      className={cn(toastVariants({ variant }), className)}
      {...toastAnimation}
      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
    >
      <div className="flex gap-2 items-center">{children}</div>

      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "absolute right-2 top-2 rounded-md p-1",
            "opacity-70 ring-offset-white transition-opacity",
            "hover:opacity-100 focus:outline-none focus:ring-2",
            "focus:ring-gray-950 focus:ring-offset-2",
            variant === "default" && "text-gray-950/50 hover:text-gray-950",
            variant !== "default" && "text-white"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </motion.div>
  );
}

// Usage example:
// <Toast variant="success" onClose={() => setOpen(false)}>
//   <CheckCircle className="h-5 w-5" />
//   <p>Захиалга амжилттай</p>
// </Toast>
