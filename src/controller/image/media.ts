import {
    storage,
    uploadBytes,
    ref,
    getDownloadURL,
} from "../../config/firebase";
import catchAsyncError from "../../middleware/catchAsyncerror";
import ErrorHandler from "../../util/error";
import { Request, Response, NextFunction } from "express";
const uploadImage = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.files === undefined) {
            return next(new ErrorHandler(400, "Image is Required!"));
        } else {
            if (req.body.path == undefined) {
                return next(new ErrorHandler(400, "Define category path!"));
            }

            let urls: string[] = [];
            for (const f in req.files) {
                // @ts-ignore
                const file = req.files[f];
                const timeStamp = Date.now();
                const nt = file.originalname.split(".");
                const name = nt[0];

                const filename = name + "_" + timeStamp + ".webp";
                const imageRef = ref(
                    storage,
                    "adInventory/" + req.body.path + "/" + filename
                );
                const metaData = {
                    contentType:
                        "image/webp, video/webp, video/mp4, video/m3u8",
                };
                const snapshot = await uploadBytes(
                    imageRef,
                    file.buffer,
                    metaData
                );
                const url = await getDownloadURL(snapshot.ref);
                urls.push(url);
            }

            if (urls.length === Object.keys(req.files).length) {
                res.status(200).json({
                    urls: urls[0],
                });
            } else {
                res.status(400).json({
                    message: "something lost",
                });
            }

            next();
        }
    }
);

export default uploadImage;
