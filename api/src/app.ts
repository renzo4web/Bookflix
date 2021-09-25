import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import routerBook from "./routes/books.routes";
import routerAuth from "./routes/auth.routes";
import routerSpec from "./routes/special.routes";

declare global {
  namespace Express {
    interface Request {
      uid: string;
    }
  }
}

const app = express();
app.set("port", config.DB.PORT);

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(passportMiddleware);

app.use("/api", routerAuth);
app.use("/api", routerBook);
app.use("/api", routerSpec);

export default app;
