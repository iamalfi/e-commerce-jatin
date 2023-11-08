// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  size: string[];
  price: number;
  media: object;
  sales_price: number;
  details: object;
  description: string;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      enum: ["XXL", "XL", "L", "M", "XXXS", "XXS", "XS", "S"],
      default: ["XXL", "XL", "L", "M", "XXXS", "XXS", "XS", "S"],
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
    sales_price: {
      type: Number,
      default: 0,
    },
    media: [
      {
        type: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    details: {},
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
