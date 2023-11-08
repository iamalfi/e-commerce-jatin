import { hasUserProperty } from "../../middleware/auth";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import Cart from "../../model/cart";
import Product from "../../model/product"; // Import your Product model

const deleteCart = catchAsyncError(async (req, res, next) => {
    if (hasUserProperty(req)) {
        let { productId } = req.body;

        // Find the user's cart and populate it with ad details
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

        // Find the product by productId to get the price
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler(404, "Product not found"));
        }

        // Access the product's price
        const productPrice = product.price || 0;

        // Update the cart's total price and total items
        cart.totalPrice -= deletedItem.quantity * productPrice;
        cart.totalItems -= 1;

        // Update the cart's items with the filtered items
        let updatedItems = cart.items.filter(
            (item: any) => item.productId?._id != productId
        );
        cart.items = updatedItems;

        // Save the updated cart
        await cart.save();

        // Respond with a success message and the updated cart
        res.status(200).json({
            success: true,
            message: "Ad Deleted Successfully",
            cart: cart,
        });
    }
});
export default deleteCart;
