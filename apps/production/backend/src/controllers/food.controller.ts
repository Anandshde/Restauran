import { Request, Response } from "express";
import Food, { IFood } from "../models/Food";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { name, price, image, category } = req.body;
    const food = new Food({ name, price, image, category });
    const savedFood = await food.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(500).json({ error: "Error creating food item" });
  }
};

export const getAllFoods = async (_req: Request, res: Response) => {
  try {
    const foods = await Food.find().sort({ category: 1, name: 1 });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: "Error fetching food items" });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const food = await Food.findByIdAndUpdate(id, update, { new: true });

    if (!food) {
      res.status(404).json({ error: "Food item not found" });
      return;
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Error updating food item" });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);

    if (!food) {
      res.status(404).json({ error: "Food item not found" });
      return;
    }

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting food item" });
  }
};
