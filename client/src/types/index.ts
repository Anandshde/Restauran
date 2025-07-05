export interface Food {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  status: "active" | "inactive";
  isSpicy?: boolean;
  prepTime?: number;
  rating?: number;
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
    notes?: string;
  }[];
  status: "pending" | "preparing" | "served" | "completed" | "cancelled";
  tableNumber?: number;
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

// Aliases for legacy imports
export type IOrder = Order;
export type FoodItem = Food;
