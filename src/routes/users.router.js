import { Router } from "express";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware2 } from "../middlewares/auth.middleware.js";
import { findUsers, findUserById, findUserByEmail, deleteUser } from '../controllers/users.controller.js'
import passport from "passport";
const router = Router();

router.get("/", findUsers);

router.get("/:idUser", 
    //jwtValidation, 
    passport.authenticate('jwt', {session: false}),
    authMiddleware2('user'), 
    findUserById
);

// router.get("/:email", findUserByEmail)

router.delete("/:idUser", deleteUser)

export default router;