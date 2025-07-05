import { Food, Table, Order, DemoStats, DemoData } from "../types";

// Demo Foods - Mix of Mongolian and International dishes
export const DEMO_FOODS: Food[] = [
  // Mongolian Traditional
  {
    _id: "food_1",
    name: "Хуушуур",
    description: "Mongolian fried meat pastry with mutton and onions",
    price: 8500,
    category: "Main",
    image: "/images/demo/khuushuur.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_2",
    name: "Буузы",
    description: "Traditional steamed dumplings with meat filling",
    price: 12000,
    category: "Main",
    image: "/images/demo/buuz.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_3",
    name: "Цуйван",
    description: "Mongolian stir-fried noodles with vegetables and meat",
    price: 15000,
    category: "Main",
    image: "/images/demo/tsuivan.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_4",
    name: "Хорхог",
    description: "Traditional Mongolian barbecue cooked with hot stones",
    price: 25000,
    category: "Main",
    image: "/images/demo/khorkhog.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_5",
    name: "Сүүтэй цай",
    description: "Traditional Mongolian milk tea with salt",
    price: 3500,
    category: "Drink",
    image: "/images/demo/milk-tea.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_6",
    name: "Айраг",
    description: "Fermented mare's milk - traditional Mongolian drink",
    price: 4500,
    category: "Drink",
    image: "/images/demo/airag.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },

  // International Options
  {
    _id: "food_7",
    name: "Beef Steak",
    description: "Grilled beef steak with seasonal vegetables",
    price: 28000,
    category: "Main",
    image: "/images/demo/beef-steak.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_8",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with caesar dressing and croutons",
    price: 9500,
    category: "Side",
    image: "/images/demo/caesar-salad.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_9",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with vanilla ice cream",
    price: 7500,
    category: "Dessert",
    image: "/images/demo/chocolate-cake.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_10",
    name: "Coffee",
    description: "Freshly brewed coffee",
    price: 4000,
    category: "Drink",
    image: "/images/demo/coffee.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_11",
    name: "Fried Rice",
    description: "Wok-fried rice with vegetables and choice of protein",
    price: 11000,
    category: "Main",
    image: "/images/demo/fried-rice.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "food_12",
    name: "Ice Cream",
    description: "Vanilla ice cream with chocolate sauce",
    price: 5500,
    category: "Dessert",
    image: "/images/demo/ice-cream.jpg",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Demo Tables
export const DEMO_TABLES: Table[] = [
  {
    _id: "table_1",
    name: "Ширээ 1",
    status: "available",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "table_2",
    name: "Ширээ 2",
    status: "occupied",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "table_3",
    name: "Ширээ 3",
    status: "available",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "table_4",
    name: "Ширээ 4",
    status: "occupied",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "table_5",
    name: "Ширээ 5",
    status: "available",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Demo Orders
export const DEMO_ORDERS: Order[] = [
  {
    _id: "order_1",
    tableId: "table_2",
    items: [
      {
        foodId: "food_1",
        quantity: 2,
        name: "Хуушуур",
        price: 8500,
      },
      {
        foodId: "food_5",
        quantity: 2,
        name: "Сүүтэй цай",
        price: 3500,
      },
    ],
    status: "preparing",
    totalAmount: 24000,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
  },
  {
    _id: "order_2",
    tableId: "table_4",
    items: [
      {
        foodId: "food_2",
        quantity: 1,
        name: "Буузы",
        price: 12000,
      },
      {
        foodId: "food_3",
        quantity: 1,
        name: "Цуйван",
        price: 15000,
      },
      {
        foodId: "food_6",
        quantity: 1,
        name: "Айраг",
        price: 4500,
      },
    ],
    status: "pending",
    totalAmount: 31500,
    createdAt: "2024-01-15T11:15:00Z",
    updatedAt: "2024-01-15T11:15:00Z",
  },
  {
    _id: "order_3",
    tableId: "table_1",
    items: [
      {
        foodId: "food_7",
        quantity: 1,
        name: "Beef Steak",
        price: 28000,
      },
      {
        foodId: "food_8",
        quantity: 1,
        name: "Caesar Salad",
        price: 9500,
      },
      {
        foodId: "food_10",
        quantity: 1,
        name: "Coffee",
        price: 4000,
      },
    ],
    status: "completed",
    totalAmount: 41500,
    createdAt: "2024-01-15T09:45:00Z",
    updatedAt: "2024-01-15T10:15:00Z",
  },
];

// Demo Statistics
export const DEMO_STATS: DemoStats = {
  totalOrders: 47,
  totalRevenue: 1250000,
  activeOrders: 8,
  completedToday: 12,
  popularItems: [
    { name: "Хуушуур", count: 23 },
    { name: "Буузы", count: 18 },
    { name: "Цуйван", count: 15 },
    { name: "Сүүтэй цай", count: 31 },
    { name: "Beef Steak", count: 8 },
  ],
  busyHours: [
    { hour: "08:00", orders: 3 },
    { hour: "09:00", orders: 5 },
    { hour: "10:00", orders: 8 },
    { hour: "11:00", orders: 12 },
    { hour: "12:00", orders: 18 },
    { hour: "13:00", orders: 15 },
    { hour: "14:00", orders: 9 },
    { hour: "15:00", orders: 6 },
    { hour: "16:00", orders: 4 },
    { hour: "17:00", orders: 7 },
    { hour: "18:00", orders: 14 },
    { hour: "19:00", orders: 16 },
    { hour: "20:00", orders: 11 },
    { hour: "21:00", orders: 5 },
  ],
};

// Complete Demo Data
export const DEMO_DATA: DemoData = {
  foods: DEMO_FOODS,
  tables: DEMO_TABLES,
  orders: DEMO_ORDERS,
  stats: DEMO_STATS,
};

// Utility functions for demo data
export const getFoodById = (id: string): Food | undefined => {
  return DEMO_FOODS.find((food) => food._id === id);
};

export const getTableById = (id: string): Table | undefined => {
  return DEMO_TABLES.find((table) => table._id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return DEMO_ORDERS.find((order) => order._id === id);
};

export const getFoodsByCategory = (category: string): Food[] => {
  if (category === "All") return DEMO_FOODS;
  return DEMO_FOODS.filter((food) => food.category === category);
};

export const getActiveOrders = (): Order[] => {
  return DEMO_ORDERS.filter(
    (order) => order.status !== "completed" && order.status !== "cancelled"
  );
};

export const getCompletedOrders = (): Order[] => {
  return DEMO_ORDERS.filter((order) => order.status === "completed");
};

// Generate random demo data
export const generateRandomOrder = (tableId: string): Order => {
  const randomItems = DEMO_FOODS.sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1)
    .map((food) => ({
      foodId: food._id,
      quantity: Math.floor(Math.random() * 3) + 1,
      name: food.name,
      price: food.price,
    }));

  const totalAmount = randomItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    _id: `order_${Date.now()}`,
    tableId,
    items: randomItems,
    status: "pending",
    totalAmount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const resetDemoData = (): DemoData => {
  return { ...DEMO_DATA };
};
