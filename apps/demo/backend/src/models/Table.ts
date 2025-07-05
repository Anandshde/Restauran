import { Schema, model, Document } from "mongoose";

export interface ITable extends Document {
  tableNumber: number;
}

const tableSchema = new Schema<ITable>(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ITable>("Table", tableSchema);
