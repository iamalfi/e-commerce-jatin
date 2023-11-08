import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Cart from "../../model/cart";
import { hasUserProperty } from "../../middleware/auth";

const getCarts = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (hasUserProperty(req)) {
            const carts = await Cart.findOne({ userId: req.user.id })
                .populate({ path: "items.productId", model: "Product" })
                .select({ createdAt: 0, updatedAt: 0, __v: 0 });

            return res.status(200).json({
                success: true,
                message: "Cart Fetched Successfully!",
                carts,
            });
        }
    }
);
export default getCarts;
