// Core Entity Types
export interface Food {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Food {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: Food) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export interface Order {
  _id: string;
  tableId: string;
  items: {
    foodId: string;
    quantity: number;
    name: string;
    price: number;
  }[];
  status: "pending" | "preparing" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  _id: string;
  name: string;
  status: "available" | "occupied";
  createdAt: string;
  updatedAt: string;
}

// Admin Types
export interface Admin {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "manager";
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Payment Types
export interface PaymentRequest {
  amount: number;
  orderId: string;
  tableId: string;
  description?: string;
}

export interface PaymentResponse {
  success: boolean;
  invoiceId?: string;
  qrCode?: string;
  deepLink?: string;
  error?: string;
}

export interface EBarimtInvoice {
  id: string;
  amount: number;
  orderId: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Hook Types
export interface UseFoodsReturn {
  data: Food[] | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseOrdersReturn {
  data: Order[] | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Demo-specific Types
export interface DemoStats {
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  completedToday: number;
  popularItems: { name: string; count: number }[];
  busyHours: { hour: string; orders: number }[];
}

export interface DemoData {
  foods: Food[];
  tables: Table[];
  orders: Order[];
  stats: DemoStats;
}

// Socket Event Types
export interface SocketEvents {
  "order:created": (order: Order) => void;
  "order:updated": (order: Order) => void;
  "order:completed": (orderId: string) => void;
  "kitchen:update": (update: {
    orderId: string;
    status: Order["status"];
  }) => void;
}

// Utility Types
export type OrderStatus = Order["status"];
export type FoodCategory = "Main" | "Side" | "Dessert" | "Drink";
export type TableStatus = Table["status"];

// Form Types
export interface FoodFormData {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  status: Food["status"];
}

export interface OrderFormData {
  tableId: string;
  items: {
    foodId: string;
    quantity: number;
  }[];
}

// Component Props Types
export interface FoodCardProps {
  food: Food;
  onAddToCart?: (food: Food) => void;
  showActions?: boolean;
}

export interface OrderCardProps {
  order: Order;
  onStatusChange?: (orderId: string, status: OrderStatus) => void;
  showActions?: boolean;
}

export interface DashboardStatsProps {
  stats: DemoStats;
  loading?: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}
