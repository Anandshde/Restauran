import type { Food, Order, Table } from "@/types";

export const DEMO_FOODS: Food[] = [
  // Main Dishes
  {
    _id: "food-1",
    name: "Монгол цуйван",
    description: "Уламжлалт монгол цуйван, тарга, ногоотой",
    price: 18000,
    category: "main",
    image: "/demo/tsuivan.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-2",
    name: "Хонины шөл",
    description: "Тансаг хонины шөл, ногоо, лууван",
    price: 22000,
    category: "main",
    image: "/demo/mutton-soup.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-3",
    name: "Beef Steak",
    description: "Premium beef steak with vegetables",
    price: 35000,
    category: "main",
    image: "/demo/beef-steak.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-4",
    name: "Chicken Teriyaki",
    description: "Grilled chicken with teriyaki sauce",
    price: 28000,
    category: "main",
    image: "/demo/chicken-teriyaki.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Side Dishes
  {
    _id: "food-5",
    name: "Хуушуур",
    description: "Уламжлалт хуушуур, махтай",
    price: 8000,
    category: "side",
    image: "/demo/khuushuur.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-6",
    name: "Банштай салат",
    description: "Шинэ ногоо, банш, соустай",
    price: 12000,
    category: "side",
    image: "/demo/salad.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-7",
    name: "French Fries",
    description: "Crispy golden french fries",
    price: 9000,
    category: "side",
    image: "/demo/fries.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Desserts
  {
    _id: "food-8",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with berries",
    price: 15000,
    category: "dessert",
    image: "/demo/chocolate-cake.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-9",
    name: "Ice Cream",
    description: "Vanilla ice cream with toppings",
    price: 8000,
    category: "dessert",
    image: "/demo/ice-cream.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Drinks
  {
    _id: "food-10",
    name: "Сүүтэй цай",
    description: "Уламжлалт монгол сүүтэй цай",
    price: 4000,
    category: "drink",
    image: "/demo/milk-tea.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-11",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 6000,
    category: "drink",
    image: "/demo/orange-juice.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "food-12",
    name: "Cappuccino",
    description: "Premium coffee with steamed milk",
    price: 8000,
    category: "drink",
    image: "/demo/cappuccino.jpg",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEMO_TABLES: Table[] = [
  {
    _id: "table-1",
    name: "Ширээ 1",
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "table-2",
    name: "Ширээ 2",
    status: "occupied",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "table-3",
    name: "Ширээ 3",
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "table-4",
    name: "Ширээ 4",
    status: "occupied",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "demo-table",
    name: "Демо ширээ",
    status: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEMO_ORDERS: Order[] = [
  {
    _id: "order-1",
    tableId: "table-2",
    items: [
      {
        foodId: "food-1",
        quantity: 2,
        name: "Монгол цуйван",
        price: 18000,
      },
      {
        foodId: "food-10",
        quantity: 2,
        name: "Сүүтэй цай",
        price: 4000,
      },
    ],
    status: "preparing",
    totalAmount: 44000,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    _id: "order-2",
    tableId: "table-4",
    items: [
      {
        foodId: "food-3",
        quantity: 1,
        name: "Beef Steak",
        price: 35000,
      },
      {
        foodId: "food-7",
        quantity: 1,
        name: "French Fries",
        price: 9000,
      },
      {
        foodId: "food-12",
        quantity: 1,
        name: "Cappuccino",
        price: 8000,
      },
    ],
    status: "pending",
    totalAmount: 52000,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    _id: "order-3",
    tableId: "table-1",
    items: [
      {
        foodId: "food-2",
        quantity: 1,
        name: "Хонины шөл",
        price: 22000,
      },
      {
        foodId: "food-5",
        quantity: 3,
        name: "Хуушуур",
        price: 8000,
      },
    ],
    status: "completed",
    totalAmount: 46000,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

export const DEMO_STATS = {
  todayOrders: 27,
  todayRevenue: 1250000,
  pendingOrders: 4,
  completedOrders: 23,
  averageOrderValue: 46300,
  busyHours: [
    { hour: "12:00", orders: 8 },
    { hour: "13:00", orders: 12 },
    { hour: "14:00", orders: 6 },
    { hour: "18:00", orders: 15 },
    { hour: "19:00", orders: 18 },
    { hour: "20:00", orders: 14 },
  ],
  topItems: [
    { name: "Монгол цуйван", count: 12, revenue: 216000 },
    { name: "Beef Steak", count: 8, revenue: 280000 },
    { name: "Хуушуур", count: 15, revenue: 120000 },
    { name: "Cappuccino", count: 20, revenue: 160000 },
  ],
};

// Demo mode flag
export const DEMO_MODE =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_DEMO_MODE === "true";

// Demo restaurant info
export const DEMO_RESTAURANT = {
  name: "Монгол Ресторан",
  nameEn: "Mongol Restaurant",
  address: "Улаанбаатар хот, СБД, 1-р хороо",
  phone: "+976 7777-7777",
  email: "info@mongolrestaurant.mn",
  logo: "/demo/restaurant-logo.png",
  qrCode: "/demo/qr-code.png",
};

// Helper functions
export const getDemoFood = (id: string): Food | undefined => {
  return DEMO_FOODS.find((food) => food._id === id);
};

export const getDemoTable = (id: string): Table | undefined => {
  return DEMO_TABLES.find((table) => table._id === id);
};

export const getDemoOrder = (id: string): Order | undefined => {
  return DEMO_ORDERS.find((order) => order._id === id);
};

export const resetDemoData = () => {
  // This function can be used to reset demo data
  // Implementation depends on your state management
  console.log("Demo data reset");
};
