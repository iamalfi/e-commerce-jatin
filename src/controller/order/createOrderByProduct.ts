import { NextFunction, Request, Response } from "express";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Order from "../../model/order";
import Product from "../../model/product";

const createOrderByProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const { productId, quantity } = req.body;
            // Find the product
            const product = await Product.findById({ _id: productId });

            if (!product) {
                return next(new ErrorHandler(404, "Product Not found"));
            }

            // Find the order
            let order = await Order.findOne({
                $and: [
                    { userId: req.user.id },
                    { orderShortId: req.body.orderShortId },
                ],
            });

            if (!order) {
                // Create a new order if it doesn't exist
                order = new Order({
                    userId: req.user.id,
                    items: [
                        {
                            productId: product._id,
                            quantity: quantity,
                        },
                    ],
                    total_amount: product.price * quantity,
                });

                // Save the order and return the response
                await order.save();
                return res.status(201).json({
                    success: true,
                    message: "Order Created Successfully",
                    order,
                });
            }

            // Check if the product already exists in the order items
            const existingItemIndex = order.items.findIndex(
                (item) => String(item.productId) === productId
            );

            if (existingItemIndex !== -1) {
                // Update quantity and total_amount if the product exists
                order.items[existingItemIndex].quantity += quantity;
            }

            // Update total_amount based on the product price and quantity
            order.total_amount = order.items.reduce((total, item) => {
                const productPrice = product.price; // Replace with the actual field in your Product model
                return total + item.quantity * productPrice;
            }, 0);

            // Save the order
            await order.save();
            return res.status(201).json({
                success: true,
                message: "Order Created Successfully",
                order,
            });
        }
    }
);

export default createOrderByProduct;
