import { Request, Response, NextFunction } from "express";

function catchAsyncError(
    passedFunction: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
}

export default catchAsyncError;
