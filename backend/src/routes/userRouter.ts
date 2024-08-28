import express from "express";

import { signup } from "../controllers/userController";

const router = express.Router();

router.post("/sign-up", signup);
// router.post("/login", login);

// router.get("/users", getAllUsers);
// router.get("/users/:id", getAUser);

// router.put("/users/:id", updateAUser);

export default router;
