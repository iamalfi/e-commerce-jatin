import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Product from "../../model/product";

const getAllProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.find();
        return res.status(200).json({
            success: true,
            message: "Product fetched Successfully!",
            product: product,
        });
    }
);
export default getAllProduct;
