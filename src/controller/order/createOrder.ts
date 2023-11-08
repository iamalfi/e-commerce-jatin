import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Cart from "../../model/cart";
import Order from "../../model/order";
import Product from "../../model/product";
const createOrder = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            if (req.body.cartId) {
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
                const order = await Order.create(req.body);
                return res.status(201).json({
                    success: true,
                    message: "Order created Successfully!",
                    order: order,
                });
            } else if (req.body.productId || req.body.quantity) {
                const { productId, quantity } = req.body;
                const product = await Product.findOne({
                    _id: req.body.productId,
                });
                if (!product) {
                    return next(new ErrorHandler(404, "Product Not Found"));
                }
                let newOrder;
                const order = await Order.findOne({ userId: req.user._id });
                if (!order?.items?.productId) {
                    newOrder = new Order({
                        userId: req.user._id,
                        items: {
                            productId,
                            quantity,
                        },
                        total_amount: product.price * quantity,
                    });
                } else {
                    const newQuantity = order.items.quantity + quantity;
                    order.items.quantity = newQuantity;
                    order.total_amount = product.price * order.items.quantity;
                    newOrder = order;
                }

                await newOrder.save();

                return res.status(201).json({
                    success: true,
                    message: "Order created Successfully!",
                    order: newOrder,
                });
            } else {
                return next(
                    new ErrorHandler(
                        400,
                        "Provide cartId or (ProductId and quantity) you can provide only one feild"
                    )
                );
            }
        }
    }
);
export default createOrder;
