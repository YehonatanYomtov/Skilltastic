import express from "express";

import { getUserByEmail, signup } from "../controllers/userController";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/user", getUserByEmail);
// router.post("/login", login);

// router.get("/users", getAllUsers);

// router.put("/users/:id", updateAUser);

export default router;
