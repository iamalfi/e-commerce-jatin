import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../model/user";
import ErrorHandler from "../../util/error";
import { ADMIN_EMAIL } from "../../util/credential";

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return next(
                new ErrorHandler(400, "name, email and password are required")
            );
        }
        if (req.body.email == ADMIN_EMAIL) {
            req.body.role = "admin";
        }
        const user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler(400, "Email already in use"));
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: req.body.role,
        });
        res.status(201).json({
            success: true,
            message: "User Register Successfully!",
            user: newUser,
        });
    } catch (err) {
        next(err);
    }
};

export default register;
