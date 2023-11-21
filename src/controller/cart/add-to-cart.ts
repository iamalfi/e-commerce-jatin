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

            let product = await Product.findById({ _id: productId });
            if (!product) {
                return next(new ErrorHandler(400, "ad does not exist"));
            }

            let cart = await Cart.findOne({ userId: req.user.id });

            if (!cart) {
                cart = new Cart({
                    userId: req.user.id,
                    items: [{ productId, quantity }],
                    totalPrice: product.price * quantity,
                    totalItems: 1,
                });
            } else {
                const existingItemIndex = cart.items.findIndex(
                    (item) => item.productId.toString() === productId
                );

                if (existingItemIndex === -1) {
                    cart.items.push({ productId, quantity });
                } else {
                    cart.items[existingItemIndex].quantity += quantity;
                }

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
