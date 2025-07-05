import { Request, Response } from "express";
import Order, { IOrder } from "../models/Order";
import { emitNewOrder, emitOrderUpdated } from "../config/socket";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { tableNumber, items } = req.body;

    // Calculate total from items
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      tableNumber,
      items,
      total,
      paid: false,
      status: "pending",
    });

    const savedOrder = await order.save();

    // Emit new order event
    emitNewOrder(savedOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
};

export const getOrdersByTableNumber = async (req: Request, res: Response) => {
  try {
    const { tableNumber } = req.params;
    const orders = await Order.find({
      tableNumber: parseInt(tableNumber),
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "preparing", "served"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    // Emit order updated event
    emitOrderUpdated(order);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error updating order status" });
  }
};
