import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Product from "../../model/product";

const createProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Product Created Successfully!",
            product: product,
        });
    }
);
export default createProduct;
