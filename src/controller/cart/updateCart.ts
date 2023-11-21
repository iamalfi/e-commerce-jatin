import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Cart from "../../model/cart";
import Product from "../../model/product";
import { hasUserProperty } from "../../middleware/auth";

const updateCart = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const data = req.body;
            let { productId, cartId, removeProduct, ...a } = data;

            let product = await Product.findById({ _id: productId });
            if (!product) {
                return next(new ErrorHandler(400, "product does not exist"));
            }

            let cart = await Cart.findOne({
                userId: req.user._id,
                _id: cartId,
            });

            if (!cart)
                return next(
                    new ErrorHandler(400, "productd products to cart first")
                );

            let productsInCart = cart.items.find(
                (product: { productId: any }) => product.productId == productId
            );
            productId = String(productId);
            cartId = String(cartId);

            if (productsInCart == undefined) {
                return next(
                    new ErrorHandler(400, "No products in the cart to update")
                );
            }

            let productsIndex = cart.items.findIndex(
                (product: { productId: any }) => product.productId == productId
            );
            if (![0, 1].includes(removeProduct)) {
                return next(
                    new ErrorHandler(400, "Put either 0 or 1 to remove")
                );
            }

            if (removeProduct == 0 || productsInCart.quantity == 1) {
                cart.items.splice(productsIndex, 1);
                let updatedTotalPrice =
                    cart.totalPrice - product.price * productsInCart.quantity;
                let updatedTotalItems = cart.totalItems - 1;
                let updatedCart = await Cart.findOneAndUpdate(
                    { _id: cartId, userId: req.user._id },
                    {
                        items: cart.items,
                        totalPrice: updatedTotalPrice,
                        totalItems: updatedTotalItems,
                    },
                    { new: true }
                );
                return res.status(200).send({
                    success: true,
                    message: "Updated successfully",
                    data: updatedCart,
                });
            }

            if (removeProduct == 1) {
                productsInCart.quantity = productsInCart.quantity - 1;
                cart.items.splice(productsIndex, 1, productsInCart);
                let updatedTotalPrice = cart.totalPrice - product.price;
                let updatedCart = await Cart.findOneAndUpdate(
                    { _id: cartId, userId: req.user._id },
                    { items: cart.items, totalPrice: updatedTotalPrice },
                    { new: true }
                );
                return res.status(200).send({
                    success: true,
                    message: "Updated successfully",
                    data: updatedCart,
                });
            }
        }
    }
);

export default updateCart;
