const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    unique: false,
  },
  maker: {
    type: String,
    required: true,
    unique: false,
  },
  year: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
});

module.exports = mongoose.model("Car", carSchema);
