import Router from "express-promise-router";
import {
  logout,
  profile,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post("/signin", validateSchema(signinSchema), signin);

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/logout", logout);

router.get("/profile", isAuth, profile);

export default router;
