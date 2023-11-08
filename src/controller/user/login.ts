import { NextFunction, Request, Response } from "express";
import User from "../../model/user";
import bcrypt from "bcrypt";

import ErrorHandler from "../../util/error";
import generateToken from "../../middleware/generateToken";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return next(
                new ErrorHandler(400, "email and password is required")
            );
        }
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return next(new ErrorHandler(400, "Account doesn't Exist!"));
        }

        const comparePassword = await bcrypt.compare(
            password,
            existUser.password
        );
        if (!comparePassword) {
            return next(
                new ErrorHandler(400, "Email or Password is Incorrect")
            );
        }
        const token = generateToken(existUser);
        if (!token) {
            return res
                .status(400)
                .json({ status: false, message: "token cannot generate" });
        }
        return res.status(200).json({
            status: true,
            message: "user Login Successfully!",
            user: token,
        });
    } catch (err) {
        next(err);
    }
};

export default login;
