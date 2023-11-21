import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Order from "../../model/order";
const getOrder = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const order = await Order.findOne({
                $and: [
                    { userId: req.user.id },
                    { orderShortId: req.params.orderShortId },
                ],
            })
                .populate({
                    path: "userId",
                    model: "User",
                    select: "-Password -__v",
                })
                .populate({
                    path: "items.productId",
                    model: "Product",
                    select: "-__v",
                })
                .populate({
                    path: "cartId",
                    model: "Cart",
                    select: "-__v",
                })

                .exec();

            return res.status(200).json({
                success: true,
                message: "Order fetched Successfully",
                order: order,
            });
        }
    }
);
export default getOrder;
