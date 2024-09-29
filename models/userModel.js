const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generateUniqueId = require('../helper/userHelper');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    academy:{
      type: String,
      required: [true , "Academy is required"]
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to ensure uniqueness of the _id
userSchema.pre("save", async function (next) {
  if (!this._id) {
    // Check if _id is not already set
    this._id = await generateUniqueId(userModel); // Generate the unique ID
  }
  next(); // Proceed with saving
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
