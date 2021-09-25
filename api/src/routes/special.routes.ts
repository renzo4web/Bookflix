import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
    "/admin",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log(req);
        res.send("success");
    }
);

export default router;
