import express from "express";
import {
  DEMO_FOODS,
  getFoodById,
  getFoodsByCategory,
} from "@restaurant/shared";

const router = express.Router();

// Get all foods
router.get("/", (req, res) => {
  try {
    const { category } = req.query;

    let foods = DEMO_FOODS;

    if (category && category !== "All") {
      foods = getFoodsByCategory(category as string);
    }

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch foods",
    });
  }
});

// Get food by ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const food = getFoodById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch food",
    });
  }
});

// Create food (demo - just returns success)
router.post("/", (req, res) => {
  try {
    const foodData = req.body;

    // In demo mode, we don't actually create anything
    // Just return success with mock data
    const mockFood = {
      _id: `food_${Date.now()}`,
      ...foodData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json({
      success: true,
      data: mockFood,
      message: "Food created successfully (demo mode)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create food",
    });
  }
});

// Update food (demo - just returns success)
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existingFood = getFoodById(id);
    if (!existingFood) {
      return res.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    // In demo mode, just return updated mock data
    const updatedFood = {
      ...existingFood,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: updatedFood,
      message: "Food updated successfully (demo mode)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update food",
    });
  }
});

// Delete food (demo - just returns success)
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const existingFood = getFoodById(id);
    if (!existingFood) {
      return res.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    res.json({
      success: true,
      message: "Food deleted successfully (demo mode)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete food",
    });
  }
});

export default router;
