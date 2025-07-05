# Component Structure

```
src/components/
├── ui/                    # Base UI components (buttons, inputs, etc.)
├── shared/               # Shared components used across features
│   ├── layout/          # Layout components (containers, grids)
│   ├── feedback/        # Feedback components (alerts, toasts)
│   └── loaders/         # Loading states and skeletons
├── features/            # Feature-specific components
│   ├── cart/           # Cart related components
│   ├── food/           # Food related components
│   ├── order/          # Order related components
│   └── dashboard/      # Admin dashboard components
└── animations/         # Reusable animation components
```

## Best Practices

### 1. Component Organization

- Keep components focused and single-responsibility
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Keep components under 200 lines

### 2. Styling

- Use design system tokens from `src/styles/design-system.ts`
- Follow spacing scale for consistent layout
- Use semantic color names (e.g., `primary`, `destructive`)
- Maintain responsive breakpoints

### 3. Accessibility

- Use semantic HTML elements
- Include ARIA labels and roles
- Ensure keyboard navigation
- Support screen readers
- Maintain color contrast

### 4. Animation

- Use shared animation variants
- Keep animations subtle and purposeful
- Consider reduced motion preferences
- Use consistent timing

### 5. Mongolian Language Support

- Use UTF-8 encoding
- Import text from `mongolianText` object
- Consider text length variations
- Use flexible layouts

### 6. Performance

- Lazy load components when possible
- Use skeleton loading states
- Optimize images and animations
- Implement proper memoization

## Component Template

```tsx
import { cn } from "@/lib/utils";
import { animations, transitions } from "@/styles/design-system";
import { motion } from "framer-motion";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function Component({ className, children }: ComponentProps) {
  return (
    <motion.div
      className={cn("base-styles", className)}
      {...animations.fadeIn}
      {...transitions.normal}
    >
      {children}
    </motion.div>
  );
}
```

## Animation Patterns

### 1. Stagger Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};
```

### 2. Shared Layout Animations

```tsx
<motion.div layout layoutId="unique-id">
  {/* Content */}
</motion.div>
```

### 3. List Animations

```tsx
<AnimatePresence>
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {/* Item content */}
    </motion.div>
  ))}
</AnimatePresence>
```
