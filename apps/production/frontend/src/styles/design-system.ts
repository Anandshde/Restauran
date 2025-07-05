import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Typography Scale
export const typography = {
  h1: "text-4xl font-bold tracking-tight lg:text-5xl",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
  link: "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
} as const;

// Spacing Scale (in rems)
export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// Container Sizes
export const containers = {
  sm: "max-w-screen-sm mx-auto px-4",
  md: "max-w-screen-md mx-auto px-4",
  lg: "max-w-screen-lg mx-auto px-4",
  xl: "max-w-screen-xl mx-auto px-4",
  "2xl": "max-w-screen-2xl mx-auto px-4",
  full: "w-full px-4",
} as const;

// Button Variants
export const buttonVariants = {
  primary: "bg-orange-500 hover:bg-orange-600 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
  ghost: "hover:bg-gray-100 text-gray-700",
  destructive: "bg-red-500 hover:bg-red-600 text-white",
  outline: "border border-gray-200 hover:bg-gray-100",
  link: "text-orange-500 hover:text-orange-600 underline-offset-4 hover:underline",
} as const;

// Card Variants
export const cardVariants = {
  default:
    "bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow",
  hover:
    "bg-white border rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1",
  ghost: "rounded-xl hover:bg-gray-100 transition-colors",
  outline: "border rounded-xl hover:border-gray-300 transition-colors",
} as const;

// Animation Variants
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
} as const;

// Transition Presets
export const transitions = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
  bounce: { type: "spring", stiffness: 200, damping: 15 },
  elastic: { type: "spring", stiffness: 300, damping: 20 },
} as const;

// Mongolian Language Text
export const mongolianText = {
  common: {
    add: "Нэмэх",
    remove: "Хасах",
    cancel: "Цуцлах",
    save: "Хадгалах",
    delete: "Устгах",
    edit: "Засах",
    loading: "Уншиж байна...",
    error: "Алдаа гарлаа",
    success: "Амжилттай",
  },
  cart: {
    title: "Таны сагс",
    empty: "Сагс хоосон байна",
    addMore: "Хоол нэмэх",
    total: "Нийт дүн",
    checkout: "Захиалга өгөх",
    clear: "Сагс цэвэрлэх",
    notes: "Тусгай захиалга",
    estimatedTime: "Бэлтгэх хугацаа",
  },
  food: {
    spicy: "Халуун",
    rating: "Үнэлгээ",
    prepTime: "Бэлтгэх хугацаа",
    minutes: "минут",
    addToCart: "Сагсанд нэмэх",
    quantity: "Тоо",
  },
  order: {
    status: {
      pending: "Хүлээгдэж байна",
      preparing: "Бэлтгэж байна",
      ready: "Бэлэн болсон",
      served: "Үйлчилсэн",
    },
    table: "Ширээ",
    items: "Хоол",
    total: "Нийт дүн",
    notes: "Тэмдэглэл",
    time: "Цаг",
  },
  notifications: {
    addedToCart: "Сагсанд нэмэгдлээ",
    removedFromCart: "Сагснаас хасагдлаа",
    orderPlaced: "Захиалга амжилттай",
    orderUpdated: "Захиалга шинэчлэгдлээ",
    orderCancelled: "Захиалга цуцлагдлаа",
  },
} as const;
