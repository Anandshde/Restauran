import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ResponsiveCols = Partial<Record<"sm" | "md" | "lg" | "xl" | "2xl", Cols>>;

type GridProps<T extends ElementType> = {
  children: ReactNode;
  cols?: Cols | ResponsiveCols;
  gap?: number;
  as?: T;
} & ComponentPropsWithoutRef<T>;

const getColsClass = (cols: Cols) => `grid-cols-${cols}`;
const getResponsiveColsClass = (breakpoint: string, cols: Cols) =>
  `${breakpoint}:${getColsClass(cols)}`;

export function Grid<T extends ElementType = "div">({
  children,
  cols = 1,
  gap = 4,
  as,
  className,
  ...props
}: GridProps<T>) {
  const Component = as || "div";

  const colsClasses =
    typeof cols === "number"
      ? getColsClass(cols)
      : Object.entries(cols)
          .map(([breakpoint, value]) =>
            breakpoint === "sm"
              ? getColsClass(value)
              : getResponsiveColsClass(breakpoint, value)
          )
          .join(" ");

  return (
    <Component
      className={cn("grid", colsClasses, `gap-${gap}`, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// Usage example:
// Simple grid:
// <Grid cols={3} gap={6}>
//   {children}
// </Grid>
//
// Responsive grid:
// <Grid
//   cols={{
//     sm: 1,
//     md: 2,
//     lg: 3,
//     xl: 4,
//   }}
//   gap={6}
// >
//   {children}
// </Grid>
