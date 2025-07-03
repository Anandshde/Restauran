import { Request, Response } from "express";
import Table, { ITable } from "../models/Table";

export const createTable = async (req: Request, res: Response) => {
  try {
    const { tableNumber } = req.body;

    // Check if table number already exists
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      res.status(400).json({ error: "Table number already exists" });
      return;
    }

    const table = new Table({ tableNumber });
    const savedTable = await table.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ error: "Error creating table" });
  }
};

export const getAllTables = async (_req: Request, res: Response) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tables" });
  }
};
