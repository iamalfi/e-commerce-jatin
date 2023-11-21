import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Order, { IOrder } from "../../model/order";
import Product from "../../model/product";
const updateOrder = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const removeAd = req.body.removeAd;
            let product = await Product.findById({ _id: req.body.productId });
            if (!product) {
                return next(new ErrorHandler(404, "Product does not exist"));
            }

            if (removeAd !== 1) {
                return next(new ErrorHandler(400, "Put  1 to remove"));
            }
            const order = await Order.findOne({
                orderShortId: req.body.orderShortId,
            });
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }
            if (removeAd === 1) {
                if (order.total_amount && order.items?.quantity) {
                    order.total_amount -= product.price;
                    order.items.quantity--;

                    const updatedOrder = await order.save();

                    return res.status(200).json({
                        success: true,
                        message: "Updated successfully",
                        data: updatedOrder,
                    });
                }
            }
        }
    }
);
export default updateOrder;
