import { Request, Response, NextFunction } from "express";
import { config } from "@restaurant/shared";

export const demoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add demo mode headers
  res.setHeader("X-Demo-Mode", config.mode);
  res.setHeader("X-Demo-Timestamp", new Date().toISOString());

  // Add demo warning for non-demo environments
  if (config.mode !== "demo") {
    console.warn("⚠️  Demo middleware running in non-demo mode");
  }

  next();
};
