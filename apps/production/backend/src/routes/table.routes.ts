import { Router } from "express";
import { createTable, getAllTables } from "../controllers/table.controller";

const router = Router();

router.post("/", createTable);
router.get("/", getAllTables);

export default router;
