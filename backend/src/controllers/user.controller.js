const {
  _register,
  _findUserByUsername,
  _getAllUsers,
  _getAUser,
  _updateAUser,
} = require("../models/user.model.js");

const bcrypt = require("bcrypt");

async function register(req, res) {
  const { email, username, first_name, last_name, password } = req.body;

  if (!email || !username || !first_name || !last_name || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await _findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await _register({ email, username, first_name, last_name }, hashedPassword);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(`Error registering user: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error." });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await _findUserByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await _getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(`Error fetching all users: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error." });
  }
}

async function getAUser(req, res) {
  const { id } = req.params;

  try {
    const user = await _getAUser(id);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error fetching user: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error." });
  }
}

async function updateAUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    await _updateAUser(id, userData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(`Error updating user: ${err.message}`);
    if (
      err.message === "Email is already taken" ||
      err.message === "Username is already taken"
    ) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  getAUser,
  updateAUser,
};
