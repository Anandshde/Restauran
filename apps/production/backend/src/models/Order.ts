import { Schema, model, Document, Types } from "mongoose";

interface OrderItem {
  foodId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  tableNumber: number;
  items: OrderItem[];
  total: number;
  paid: boolean;
  status: "pending" | "preparing" | "served";
  createdAt: Date;
  barimt?: {
    billId: string;
    qrData: string;
    lottery: string;
  };
  paymentId?: string;
}

const orderSchema = new Schema<IOrder>(
  {
    tableNumber: {
      type: Number,
      required: true,
    },
    items: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "served"],
      default: "pending",
    },
    barimt: {
      billId: String,
      qrData: String,
      lottery: String,
    },
    paymentId: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<IOrder>("Order", orderSchema);
