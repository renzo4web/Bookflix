import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const signValidate: RequestHandler = (req, res, next) => {
    console.log("req", req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
    }

    next();
};
