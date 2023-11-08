// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user" | undefined;
}

const UserSchema = new Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            // required: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
