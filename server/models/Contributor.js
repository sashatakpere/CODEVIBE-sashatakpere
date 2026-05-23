const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profileUrl: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
    commits: {
      type: Number,
      default: 0,
    },
    prs: {
      type: Number,
      default: 0,
    },
    issues: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contributor", contributorSchema);
