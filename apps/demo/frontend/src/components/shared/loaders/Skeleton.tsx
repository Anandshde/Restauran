import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, type ElementType } from "react";

type SkeletonProps<T extends ElementType> = {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  as?: T;
} & ComponentPropsWithoutRef<T>;

const roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

export function Skeleton<T extends ElementType = "div">({
  width,
  height,
  rounded = "md",
  as,
  className,
  style,
  ...props
}: SkeletonProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        roundedMap[rounded],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

// Usage examples:
// <Skeleton width={200} height={24} />
// <Skeleton width="100%" height={40} rounded="lg" />
// <Skeleton width={48} height={48} rounded="full" />
