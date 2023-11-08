import { Router } from "express";
import userRoutes from "../routes/userRoutes";
import productRoutes from "../routes/productRoutes";
import mediaRoutes from "../routes/mediaRotes";
import orderRoutes from "../routes/orderRoutes";
import cartRoutes from "../routes/cartroutes";
const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/media", mediaRoutes);
router.use("/order", orderRoutes);
router.use("/cart", cartRoutes);

export default router;
