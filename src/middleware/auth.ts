import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../model/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../util/error";
import { JWT_SECRET } from "../util/credential";

export function hasUserProperty(req: Request): req is Request & { user: any } {
    return "user" in req;
}

interface DecodedToken extends JwtPayload {
    id: string;
    email: string;
}
export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bearerToken = req.headers["authorization"];

        if (!bearerToken) {
            return next(
                new ErrorHandler(401, "Unauthorized, Token not provided")
            );
        }
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
        if (!decodedToken) {
            return next(new ErrorHandler(401, "Unauthorized"));
        }
        const user = await User.findById(decodedToken?.id);
        if (!user) {
            return next(
                new ErrorHandler(401, "Unauthorized,User does not exist")
            );
        }

        // @ts-ignore
        req.user = user;
        // console.log(req.user);

        next();
    } catch (err) {
        next(err);
    }
};
export const userAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (hasUserProperty(req)) {
            const user = await User.findOne({ email: req.user.email });

            if (!user) {
                return res
                    .status(401)
                    .json({ status: false, message: "Unauthorized" });
            }
            req.user = user as IUser;
            next();
        }
    } catch (err) {
        next(err);
    }
};

export const isAdminAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (hasUserProperty(req) && req.user.role !== "admin") {
            return next(
                new ErrorHandler(400, "Only Admin can do this operation😒")
            );
        }

        next();
    } catch (err) {
        next(err);
    }
};
