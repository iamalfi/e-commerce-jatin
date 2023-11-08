import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_SECRET } from "../util/credential";

const generateToken = function (user: any): string {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
    });
};

export default generateToken;
