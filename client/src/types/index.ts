export interface FoodItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export interface IOrder {
  _id: string;
  tableNumber: number;
  items: {
    foodId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paid: boolean;
  status: "pending" | "preparing" | "served";
  createdAt: string;
}
