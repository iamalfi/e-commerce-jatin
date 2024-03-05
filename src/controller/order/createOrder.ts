import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Cart from "../../model/cart";
import Order from "../../model/order";

const createOrder = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const cart = await Cart.findOne({ _id: req.body.cartId });
            if (!cart) {
                return next(
                    new ErrorHandler(
                        400,
                        "cart not found, add some products in your cart"
                    )
                );
            }
            req.body.total_amount = cart.totalPrice;
            req.body.userId = req.user.id;
            req.body.items = cart.items;
            const order = await Order.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Order created Successfully!",
                order: order,
            });
        }
    }
);

export default createOrder;
