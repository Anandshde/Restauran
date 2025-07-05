import express from "express";
import { DEMO_DATA, DEMO_STATS, resetDemoData } from "@restaurant/shared";

const router = express.Router();

// Get demo statistics
router.get("/stats", (req, res) => {
  try {
    res.json({
      success: true,
      data: DEMO_STATS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch demo statistics",
    });
  }
});

// Reset demo data
router.post("/reset", (req, res) => {
  try {
    const freshData = resetDemoData();

    // In a real implementation, this would reset the in-memory store
    // For now, we just return the fresh data
    res.json({
      success: true,
      message: "Demo data reset successfully",
      data: freshData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to reset demo data",
    });
  }
});

// Get all demo data
router.get("/data", (req, res) => {
  try {
    res.json({
      success: true,
      data: DEMO_DATA,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch demo data",
    });
  }
});

// Demo health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    mode: "demo",
    timestamp: new Date().toISOString(),
    message: "Demo backend is running",
  });
});

export default router;
