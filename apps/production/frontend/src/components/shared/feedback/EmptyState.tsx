import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card" | "minimal";
}

const sizeClasses = {
  sm: {
    wrapper: "py-6",
    icon: "h-8 w-8",
    title: "text-base",
    description: "text-sm",
  },
  md: {
    wrapper: "py-8",
    icon: "h-12 w-12",
    title: "text-lg",
    description: "text-base",
  },
  lg: {
    wrapper: "py-12",
    icon: "h-16 w-16",
    title: "text-xl",
    description: "text-lg",
  },
} as const;

const variantClasses = {
  default: "bg-gray-50 border rounded-xl shadow-sm",
  card: "bg-white border rounded-xl shadow-sm",
  minimal: "",
} as const;

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
  variant = "default",
}: EmptyStateProps) {
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <MotionWrapper
      animation="fadeIn"
      transition="normal"
      className={cn("w-full px-6", variantClass, sizeClass.wrapper, className)}
    >
      <div className="flex flex-col items-center text-center">
        {Icon && (
          <MotionWrapper animation="scale" transition="bounce" className="mb-4">
            <Icon
              className={cn(sizeClass.icon, "text-gray-400")}
              aria-hidden="true"
            />
          </MotionWrapper>
        )}

        <MotionWrapper
          animation="slideUp"
          transition="normal"
          className="space-y-2"
        >
          <h3 className={cn(sizeClass.title, "font-semibold text-gray-900")}>
            {title}
          </h3>

          {description && (
            <p className={cn(sizeClass.description, "text-gray-500 max-w-sm")}>
              {description}
            </p>
          )}

          {action && (
            <div className="mt-6">
              <Button
                onClick={action.onClick}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {action.label}
              </Button>
            </div>
          )}
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
}

// Usage examples:
// import { ShoppingCart, Search, AlertCircle } from "lucide-react";
//
// // Cart empty state
// <EmptyState
//   icon={ShoppingCart}
//   title="Сагс хоосон байна"
//   description="Та хоол сонгоогүй байна"
//   action={{
//     label: "Хоол нэмэх",
//     onClick: () => setIsOpen(false),
//   }}
// />
//
// // Search no results
// <EmptyState
//   icon={Search}
//   title="Хайлтын илэрц олдсонгүй"
//   description="Өөр түлхүүр үгээр хайна уу"
//   size="sm"
//   variant="minimal"
// />
//
// // Error state
// <EmptyState
//   icon={AlertCircle}
//   title="Алдаа гарлаа"
//   description="Серверт холбогдоход алдаа гарлаа"
//   action={{
//     label: "Дахин оролдох",
//     onClick: () => refetch(),
//   }}
//   variant="card"
//   size="lg"
// />
