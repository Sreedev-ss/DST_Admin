const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const superAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const superAdminModel = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = superAdminModel;
