import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Product from "../../model/product";
import ErrorHandler from "../../util/error";

const updateProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId },
            req.body,
            { new: true }
        );
        if (!product) {
            return next(new ErrorHandler(404, "Product Not Found!"));
        }
        return res.status(200).json({
            success: true,
            message: "Product details Update Successfully!",
            product: product,
        });
    }
);
export default updateProduct;
