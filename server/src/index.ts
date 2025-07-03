import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { initializeSocket } from "./config/socket";
import foodRoutes from "./routes/food.routes";
import orderRoutes from "./routes/order.routes";
import tableRoutes from "./routes/table.routes";
import paymentRoutes from "./routes/payment.routes";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

// Initialize Socket.IO
initializeSocket(httpServer);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/payment", paymentRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Restaurant API is running");
});

// Start server
httpServer.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
