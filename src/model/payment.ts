import mongoose, { Schema, Document } from "mongoose";
import generateSlugId from "./generateId";
interface PaymentProperties {
    id: string;
    // other properties...
}
export interface IPayment extends Document {
    userId: string;
    orderId: string;
    cash_on_delivery: boolean;
    status: string;
    amount: number;
    payment_properties: PaymentProperties;
}
const paymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },

        cash_on_delivery: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Paid"],
        },
        amount: Number,
        payment_properties: {},
    },
    { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", paymentSchema);
