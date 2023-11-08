import { Router } from "express";
import {
    isAdminAuth,
    isAuthenticated,
    userAuthorization,
} from "../middleware/auth";
import createOrder from "../controller/order/createOrder";
import getOrder from "../controller/order/getOrder";
import getOrderDetails from "../controller/order/getOrder";
import updateOrder from "../controller/order/updateOrder";
import getAllOrderByAdmin from "../controller/order/getAllOrderByAdmin";

const router = Router();

router.route("/create").put(isAuthenticated, userAuthorization, createOrder);
router.route("/update").put(isAuthenticated, userAuthorization, updateOrder);
router.route("/all").get(isAuthenticated, userAuthorization, getOrder);
router
    .route("/all/admin")
    .get(isAuthenticated, isAdminAuth, getAllOrderByAdmin);
router
    .route("/all/details")
    .get(isAuthenticated, userAuthorization, getOrderDetails);

export default router;
