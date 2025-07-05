import { cn } from "@/lib/utils";
import { containers } from "@/styles/design-system";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type ContainerProps<T extends ElementType> = {
  children: ReactNode;
  size?: keyof typeof containers;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  children,
  size = "lg",
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component className={cn(containers[size], className)} {...props}>
      {children}
    </Component>
  );
}

// Usage example:
// <Container size="md" className="py-8">
//   {children}
// </Container>
//
// As section:
// <Container as="section" size="md" className="py-8">
//   {children}
// </Container>
