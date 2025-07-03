import { Schema, model, Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  price: number;
  image: string;
  category: string;
}

const foodSchema = new Schema<IFood>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IFood>("Food", foodSchema);
