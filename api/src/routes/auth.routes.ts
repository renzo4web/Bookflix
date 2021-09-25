import { Router } from "express";
import { check } from "express-validator";
import passport from "passport";
import * as controllers from "../controllers/auth.controllers";
import { signValidate } from "../middlewares/sign-validator";

const router = Router();

const checksSign = [
  check("email", "Email must be valid").isEmail(),
  check("password", "Password must be at leat 6 characters long").isLength({
    min: 6,
  }),
];

/**
 * api/signup
 *
 */

router.post(
  "/signup",

  [
    ...checksSign,
    check("name", "Name must be provided").not().isEmpty(),
    signValidate,
  ],

  controllers.signUp
);

/**
 * api/signin
 *
 */

router.post(
  "/signin",
  [
    check("email", "Email must be valid").isEmail(),
    check("password", "Password must be at leat 6 characters long").isLength({
      min: 6,
    }),
    signValidate,
  ],
  controllers.signIn
);

router.get(
  "/renew",
  passport.authenticate("jwt", { session: false }),
  controllers.renewToken
);

export default router;
