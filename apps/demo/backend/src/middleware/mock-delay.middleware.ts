import { Request, Response, NextFunction } from "express";

export const mockDelayMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only apply delay to API routes
  if (!req.path.startsWith("/api/")) {
    return next();
  }

  // Get delay from environment or use default
  const delay = parseInt(process.env.DEMO_MOCK_DELAY || "500", 10);

  // Skip delay for health checks
  if (req.path === "/health") {
    return next();
  }

  // Add artificial delay to simulate network latency
  setTimeout(() => {
    next();
  }, delay);
};
