import { Router } from "express";
import {
  createFood,
  getAllFoods,
  updateFood,
  deleteFood,
} from "../controllers/food.controller";

const router = Router();

router.post("/", createFood);
router.get("/", getAllFoods);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
