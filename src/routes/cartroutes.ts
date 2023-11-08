import { Router } from "express";
import {
    isAdminAuth,
    isAuthenticated,
    userAuthorization,
} from "../middleware/auth";
import addToCart from "../controller/cart/add-to-cart";
import deleteCart from "../controller/cart/deleteCart";
import getCarts from "../controller/cart/getCarts";
import updateCart from "../controller/cart/updateCart";

const router = Router();

router.route("/create").put(isAuthenticated, userAuthorization, addToCart);
router
    .route("/delete-cart")
    .put(isAuthenticated, userAuthorization, deleteCart);
router.route("/all").get(isAuthenticated, userAuthorization, getCarts);
router.route("/update").put(isAuthenticated, userAuthorization, updateCart);

export default router;
