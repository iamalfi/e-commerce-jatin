import { Router } from "express";
const router = Router();
import multer, { Multer } from "multer";
import media from "../controller/image/media";

router.post(
    "/upload",
    multer({
        limits: {
            fileSize: 50 * 1024 * 1024, // 50MB (increase as needed)
        },
    }).array("medias", 50),
    media // Specify the field name and the maximum number of files
);

export default router;
