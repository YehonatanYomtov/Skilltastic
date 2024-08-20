const express = require("express");

const {
  register,
  login,
  getAllUsers,
  getAUser,
  updateAUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", getAllUsers);
router.get("/users/:id", getAUser);

router.put("/users/:id", updateAUser);

module.exports = router;
