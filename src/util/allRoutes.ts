import { Router } from "express";
import userRoutes from "../routes/userRoutes";
import productRoutes from "../routes/productRoutes";
import mediaRoutes from "../routes/mediaRotes";
const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/media", mediaRoutes);

export default router;
