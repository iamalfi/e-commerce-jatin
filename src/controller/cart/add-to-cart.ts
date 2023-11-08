import { NextFunction, Request, Response } from "express";
import Cart from "../../model/cart";
import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Product from "../../model/product";
import ErrorHandler from "../../util/error";
const addToCart = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const { productId, quantity } = req.body;

            // Find the ad with the given productId
            let product = await Product.findById({ _id: productId });
            if (!product) {
                return next(new ErrorHandler(400, "ad does not exist"));
            }

            // Find the user's cart
            let cart = await Cart.findOne({ userId: req.user.id });

            if (!cart) {
                // Create a new cart for the user if they don't have one
                cart = new Cart({
                    userId: req.user.id,
                    items: [{ productId, quantity }],
                    totalPrice: product.price * quantity,
                    totalItems: 1,
                });
            } else {
                // Check if the ad is already in the cart
                const existingItemIndex = cart.items.findIndex(
                    (item) => item.productId.toString() === productId
                );

                if (existingItemIndex === -1) {
                    // Add a new item to the cart
                    cart.items.push({ productId, quantity });
                } else {
                    // Update the quantity for the existing item in the cart
                    cart.items[existingItemIndex].quantity += quantity;
                }

                // Recalculate the total price and total items in the cart
                let newTotalPrice = 0;
                for (const item of cart.items) {
                    const itemAd = await Product.findById(item.productId);
                    if (itemAd) {
                        newTotalPrice += item.quantity * itemAd.price;
                    }
                }
                cart.totalPrice = newTotalPrice;
                cart.totalItems = cart.items.length;
            }

            // Save the updated cart to the database
            await cart.save();

            return res.status(200).json({
                status: true,
                message: "Cart successfully updated",
                data: cart,
            });
        }
    }
);
export default addToCart;
