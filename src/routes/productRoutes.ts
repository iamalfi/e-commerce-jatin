// src/routes/productRoutes.ts
import { Router } from "express";
import createProduct from "../controller/product/createProduct";
import getAllProduct from "../controller/product/getAllProducts";
import getProductDetails from "../controller/product/getProductDetails";
import updateProduct from "../controller/product/updateProduct";
import deleteProduct from "../controller/product/deleteProduct";
import { isAuthenticated, isAdminAuth } from "../middleware/auth";
const router = Router();

router.post("/create", isAuthenticated, isAdminAuth, createProduct);
router.get("/all", getAllProduct);

router
    .route("/:productId")
    .get(getProductDetails)
    .put(isAuthenticated, isAdminAuth, updateProduct)
    .delete(isAuthenticated, isAdminAuth, deleteProduct);

export default router;
