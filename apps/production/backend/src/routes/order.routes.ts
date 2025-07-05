import { Router } from "express";
import {
  createOrder,
  getOrdersByTableNumber,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/table/:tableNumber", getOrdersByTableNumber);
router.put("/:id/status", updateOrderStatus);

export default router;
