// types.ts

import { Request } from "express";
import { IUser } from "../model/user";
declare global {
    namespace Express {
        interface Request {
            user?: IUser | undefined; // Use the imported 'User' type
        }
    }
}
