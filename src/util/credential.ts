import dotenv from "dotenv";
dotenv.config();

export const JWT_EXPIRES = process.env.JWT_EXPIRES as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
export const MONGO_URI = process.env.MONGO_URI as string;
export const DB_NAME = process.env.DB_NAME as string;
export const RAZORPAY_TEST_KEY_ID = process.env.RAZORPAY_TEST_KEY_ID as string;
export const RAZORPAY_TEST_SECRET_KEY = process.env
    .RAZORPAY_TEST_SECRET_KEY as string;
