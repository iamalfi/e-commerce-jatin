import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Cart from "../../model/cart";
import Product from "../../model/product";

const deleteCart = catchAsyncError(async (req, res, next) => {
    if (hasUserProperty(req)) {
        let { productId } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id }).populate({
            path: "items.productId",
            model: "Product",
        });

        if (!cart) {
            return next(new ErrorHandler(404, "Cart not found"));
        }

        // Check if the item with the given productId exists in the user's cart
        let deletedItem = cart.items.find(
            (item: any) => item.productId?._id == productId
        );

        if (!deletedItem) {
            return next(new ErrorHandler(404, "Ad not found in the cart"));
        }

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler(404, "Product not found"));
        }

        const productPrice = product.price || 0;

        cart.totalPrice -= deletedItem.quantity * productPrice;
        cart.totalItems -= 1;

        let updatedItems = cart.items.filter(
            (item: any) => item.productId?._id != productId
        );
        cart.items = updatedItems;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Ad Deleted Successfully",
            cart: cart,
        });
    }
});
export default deleteCart;
