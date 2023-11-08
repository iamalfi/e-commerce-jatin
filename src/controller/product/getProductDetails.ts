import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../middleware/catchAsyncerror";
import Product from "../../model/product";

const getProductDetails = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await Product.findOne({ _id: req.params.productId });
        return res.status(200).json({
            success: true,
            message: "Product details fetched Successfully!",
            product: product,
        });
    }
);
export default getProductDetails;
