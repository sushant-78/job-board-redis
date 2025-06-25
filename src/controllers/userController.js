const asyncHandler = require("express-async-handler");
const { registerUser, loginUser } = require("../services/userService");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser(name, email, password);
  res.status(201).json(user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token } = await loginUser(email, password);
  res.json({ token });
});

module.exports = { register, login };
