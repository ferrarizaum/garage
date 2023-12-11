/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *           description: The model name of the car.
 *         maker:
 *           type: string
 *           description: The maker or manufacturer of the car.
 *         year:
 *           type: string
 *           description: The manufacturing year of the car.
 *         price:
 *           type: number
 *           description: The price of the car.
 *         ownerName:
 *           type: string
 *           description: The name of the owner of the car.
 *       required:
 *         - model
 *         - maker
 *         - year
 *         - price
 *         - ownerName
 */

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
});

module.exports = mongoose.model("Car", carSchema);
