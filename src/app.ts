import express, {
    Application,
    NextFunction,
    Request,
    Response,
    json,
    urlencoded,
} from "express";
import connectToDatabase from "./database";

import errorMiddleware from "./middleware/errorMiddleware";
import allRoutes from "./util/allRoutes";
import cors from "cors";
import { DB_NAME, MONGO_URI } from "./util/credential";

const app: Application = express();

const PORT: number | string = 1001;
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("hello there");
});

connectToDatabase(MONGO_URI, DB_NAME);

app.use("/", allRoutes);
//error middleware
app.use(errorMiddleware);

app.listen(PORT, () =>
    console.log("server is running on http://localhost:" + PORT)
);
