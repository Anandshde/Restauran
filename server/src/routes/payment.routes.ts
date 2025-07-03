import { Router } from "express";
import {
  createPayment,
  handleQPayWebhook,
} from "../controllers/payment.controller";

const router = Router();

router.post("/create", createPayment);
router.post("/qpay-webhook", handleQPayWebhook);

export default router;
