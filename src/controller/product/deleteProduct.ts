import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Product from "../../model/product";
import ErrorHandler from "../../util/error";

const deleteProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return next(new ErrorHandler(404, "Product Not Found!"));
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted Successfully!",
            product: product,
        });
    }
);
export default deleteProduct;
