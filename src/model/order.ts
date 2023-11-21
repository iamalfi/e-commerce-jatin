import mongoose, { Schema, Document, ObjectId } from "mongoose";
import generateSlugId from "./generateId";
interface OrderItem {
    productId: ObjectId;
    quantity: number;
}
export interface IOrder extends Document {
    userId: ObjectId;
    cartId: ObjectId;
    productId: ObjectId;
    items: OrderItem;
    orderShortId: string;
    status:
        | "Ordered"
        | "Processing"
        | "Working"
        | "Approval"
        | "Delivered"
        | "Failed"
        | "Pending";
    total_items: number;
    total_amount: number;
}
const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cartId: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
        },
        orderShortId: {
            type: String,
            default: `order_id_${generateSlugId(6)}`,
        },
        status: {
            type: String,
            enum: [
                "Ordered",
                "Processing",
                "Working",
                "Approval",
                "Delivered",
                "Failed",
                "Pending",
            ],
            default: "Pending",
        },
        items: {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                minLength: 1,
            },
        },
        total_amount: {
            type: Number,
            default: 0,
        },
        isReturn: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
