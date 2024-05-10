const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { email, name, password } = req.body;
  let emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email Already Exist");
  }

  //Register as a Admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });

  const tokenUser = {}

  res.status(StatusCodes.OK).json({ user });
};

const login = async (req, res) => {
  res.send("Login user");
};

const logout = async (req, res) => {
  res.send("Logout User");
};

module.exports = {
  register,
  login,
  logout,
};
