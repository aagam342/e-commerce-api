const mongoose = require("mongoose");
const validator = require("validator");
const bcyrpt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please type the name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    require: [true, "Please provide the email"],
    validate: {
      message: "Please provide valid email",
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    require: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcyrpt.genSalt();
  this.password = await bcyrpt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcyrpt.compare(this.password, candidatePassword);
  return isMatch();
};
module.exports = mongoose.model("User", UserSchema);
