import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Order from "../../model/order";
const deleteOrderByProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const order = await Order.findOneAndDelete({
                $and: [
                    { userId: req.user.id },
                    { productId: req.body.productId },
                ],
            });

            return res.status(200).json({
                success: true,
                message: "Order Deleted Successfully",
                order: order,
            });
        }
    }
);
export default deleteOrderByProduct;
