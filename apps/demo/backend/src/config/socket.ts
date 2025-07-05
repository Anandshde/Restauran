import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { IOrder } from "../models/Order";

let io: SocketIOServer;

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on(
    "connection",
    (socket: { id: any; on: (arg0: string, arg1: () => void) => void }) => {
      console.log("🔌 Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("🔌 Client disconnected:", socket.id);
      });
    }
  );

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const emitNewOrder = (order: IOrder) => {
  getIO().emit("newOrder", order);
};

export const emitOrderUpdated = (order: IOrder) => {
  getIO().emit("orderUpdated", order);
};
