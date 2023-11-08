import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Razorpay from "razorpay";
import {
    RAZORPAY_TEST_KEY_ID,
    RAZORPAY_TEST_SECRET_KEY,
} from "../../util/credential";
const createPayment = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        let instanse = new Razorpay({
            key_id: RAZORPAY_TEST_KEY_ID,
            key_secret: RAZORPAY_TEST_SECRET_KEY,
        });
        const payment = await instanse.orders.create({
            amount: 1 * 100,
            currency: "INR",
            receipt: "receipts#1",
        });

        return res.status(201).json({
            success: true,
            message: "Payment Successfull",
            payment,
            amount: payment.amount,
        });
    }
);
export default createPayment;
