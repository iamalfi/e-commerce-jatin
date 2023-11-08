import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

// Define an interface for the Cart document
// Define types for your models

export interface ICart extends Document {
    userId: ObjectId;
    items: Array<{
        productId: ObjectId;
        quantity: number;
    }>;
    totalPrice: number;
    totalItems: number;
    createdAt: Date;
    updatedAt: Date;
}
// src/models/User.ts
const cartSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        totalItems: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ICart>("Cart", cartSchema);
