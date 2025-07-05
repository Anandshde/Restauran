import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";
import { config, logConfig } from "@restaurant/shared";

// Import routes
import foodRoutes from "./routes/food.routes";
import orderRoutes from "./routes/order.routes";
import tableRoutes from "./routes/table.routes";
import paymentRoutes from "./routes/payment.routes";
import demoRoutes from "./routes/demo.routes";

// Import middleware
import { demoMiddleware } from "./middleware/demo.middleware";
import { mockDelayMiddleware } from "./middleware/mock-delay.middleware";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 3001;

// Log configuration
logConfig();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow for demo purposes
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Demo middleware - applies to all routes
app.use(demoMiddleware);
app.use(mockDelayMiddleware);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mode: config.mode,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/demo", demoRoutes);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // Join demo room for demo-specific events
  socket.join("demo-room");

  // Handle demo events
  socket.on("demo:order:create", (orderData) => {
    // Broadcast to all clients in demo room
    io.to("demo-room").emit("demo:order:created", orderData);
  });

  socket.on("demo:order:update", (orderData) => {
    io.to("demo-room").emit("demo:order:updated", orderData);
  });

  socket.on("demo:kitchen:update", (updateData) => {
    io.to("demo-room").emit("demo:kitchen:updated", updateData);
  });

  socket.on("demo:reset", () => {
    io.to("demo-room").emit("demo:data:reset");
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Error:", err);

    if (err.type === "entity.parse.failed") {
      return res.status(400).json({
        success: false,
        error: "Invalid JSON payload",
      });
    }

    res.status(500).json({
      success: false,
      error:
        config.mode === "demo" ? "Demo server error" : "Internal server error",
      ...(process.env.NODE_ENV === "development" && { details: err.message }),
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Demo server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 Socket.IO enabled for real-time updates`);
  console.log(`🎭 Mode: ${config.mode}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

export { io };
