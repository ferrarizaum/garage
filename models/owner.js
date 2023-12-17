const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  cellphone: {
    type: Number,
    required: true,
    unique: false,
  },
  address: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("Owner", ownerSchema);
