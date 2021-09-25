import { Request, Router } from "express";
import passport from "passport";
import * as controllers from "../controllers/books.controllers";
import { IUser } from "../models/User";

const router = Router();

/**
 * POST => api/book
 */

router.use(
  "/book",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res, next) => {
    const { id } = req.user as IUser;

    if (req.user) {
      req.uid = id;
      return next();
    }
    return res.status(400).json({
      ok: false,
      msg: "user not authorized",
    });
  }
);
router.route("/book").post(controllers.addBook).get(controllers.getBooks);

/**
 * UPDATE | DELETE | GET  => api/book/:id
 */

router
  .route("/book/:id")
  .put(controllers.updateBook)
  .delete(controllers.deleteBook);

router.route("/books").get(controllers.getBooks);

export default router;
