import { useState, useEffect } from "react";
import {
  DEMO_FOODS,
  DEMO_ORDERS,
  DEMO_TABLES,
  DEMO_MODE,
} from "@/data/demoData";
import type { Food, Order, Table } from "@/types";

// Local storage keys for demo data
const DEMO_STORAGE_KEYS = {
  foods: "demo_foods",
  orders: "demo_orders",
  tables: "demo_tables",
  lastReset: "demo_last_reset",
};

export function useDemoMode() {
  const [isDemoMode, setIsDemoMode] = useState(DEMO_MODE);

  // Initialize demo data in localStorage
  useEffect(() => {
    if (isDemoMode && typeof window !== "undefined") {
      const lastReset = localStorage.getItem(DEMO_STORAGE_KEYS.lastReset);
      const today = new Date().toDateString();

      // Reset demo data daily or if not exists
      if (!lastReset || lastReset !== today) {
        resetDemoData();
      }
    }
  }, [isDemoMode]);

  const resetDemoData = () => {
    if (typeof window === "undefined") return;

    localStorage.setItem(DEMO_STORAGE_KEYS.foods, JSON.stringify(DEMO_FOODS));
    localStorage.setItem(DEMO_STORAGE_KEYS.orders, JSON.stringify(DEMO_ORDERS));
    localStorage.setItem(DEMO_STORAGE_KEYS.tables, JSON.stringify(DEMO_TABLES));
    localStorage.setItem(
      DEMO_STORAGE_KEYS.lastReset,
      new Date().toDateString()
    );
  };

  const getDemoData = <T>(key: keyof typeof DEMO_STORAGE_KEYS): T[] => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(DEMO_STORAGE_KEYS[key]);
    return stored ? JSON.parse(stored) : [];
  };

  const setDemoData = <T>(key: keyof typeof DEMO_STORAGE_KEYS, data: T[]) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(DEMO_STORAGE_KEYS[key], JSON.stringify(data));
  };

  return {
    isDemoMode,
    setIsDemoMode,
    resetDemoData,
    getDemoData,
    setDemoData,
  };
}

// Mock API functions for demo mode
export const demoApi = {
  // Foods
  getFoods: async (): Promise<Food[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    const stored = localStorage.getItem(DEMO_STORAGE_KEYS.foods);
    return stored ? JSON.parse(stored) : DEMO_FOODS;
  },

  createFood: async (
    food: Omit<Food, "_id" | "createdAt" | "updatedAt">
  ): Promise<Food> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newFood: Food = {
      ...food,
      _id: `food-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const foods = await demoApi.getFoods();
    const updatedFoods = [...foods, newFood];
    localStorage.setItem(DEMO_STORAGE_KEYS.foods, JSON.stringify(updatedFoods));

    return newFood;
  },

  updateFood: async (id: string, updates: Partial<Food>): Promise<Food> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const foods = await demoApi.getFoods();
    const updatedFoods = foods.map((food) =>
      food._id === id
        ? { ...food, ...updates, updatedAt: new Date().toISOString() }
        : food
    );

    localStorage.setItem(DEMO_STORAGE_KEYS.foods, JSON.stringify(updatedFoods));
    return updatedFoods.find((f) => f._id === id)!;
  },

  deleteFood: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const foods = await demoApi.getFoods();
    const updatedFoods = foods.filter((food) => food._id !== id);
    localStorage.setItem(DEMO_STORAGE_KEYS.foods, JSON.stringify(updatedFoods));
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const stored = localStorage.getItem(DEMO_STORAGE_KEYS.orders);
    return stored ? JSON.parse(stored) : DEMO_ORDERS;
  },

  createOrder: async (
    order: Omit<Order, "_id" | "createdAt" | "updatedAt">
  ): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newOrder: Order = {
      ...order,
      _id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = await demoApi.getOrders();
    const updatedOrders = [...orders, newOrder];
    localStorage.setItem(
      DEMO_STORAGE_KEYS.orders,
      JSON.stringify(updatedOrders)
    );

    return newOrder;
  },

  updateOrder: async (id: string, updates: Partial<Order>): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const orders = await demoApi.getOrders();
    const updatedOrders = orders.map((order) =>
      order._id === id
        ? { ...order, ...updates, updatedAt: new Date().toISOString() }
        : order
    );

    localStorage.setItem(
      DEMO_STORAGE_KEYS.orders,
      JSON.stringify(updatedOrders)
    );
    return updatedOrders.find((o) => o._id === id)!;
  },

  // Tables
  getTables: async (): Promise<Table[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const stored = localStorage.getItem(DEMO_STORAGE_KEYS.tables);
    return stored ? JSON.parse(stored) : DEMO_TABLES;
  },

  updateTable: async (id: string, updates: Partial<Table>): Promise<Table> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const tables = await demoApi.getTables();
    const updatedTables = tables.map((table) =>
      table._id === id
        ? { ...table, ...updates, updatedAt: new Date().toISOString() }
        : table
    );

    localStorage.setItem(
      DEMO_STORAGE_KEYS.tables,
      JSON.stringify(updatedTables)
    );
    return updatedTables.find((t) => t._id === id)!;
  },

  // Mock payment
  createPayment: async (
    orderId: string,
    amount: number
  ): Promise<{ success: true; paymentId: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate payment processing

    return {
      success: true,
      paymentId: `demo-payment-${Date.now()}`,
    };
  },
};
