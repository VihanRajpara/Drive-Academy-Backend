const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generateUniqueId = require('../helper/academyHelper');

const academySchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
    },
    subscription: {
      type: Number,
      default:3
    },
    info:{
      type: Object
    },
    isactive: {
      type: Boolean,
      default:true
    },
  },
  {
    timestamps: true,
  }
);
// Pre-save hook to ensure uniqueness of the _id
academySchema.pre("save", async function (next) {
  if (!this._id) {
    // Check if _id is not already set
    this._id = await generateUniqueId(academyModel); // Generate the unique ID
  }
  next(); // Proceed with saving
});
const academyModel = mongoose.model("Academy", academySchema);
module.exports = academyModel;
