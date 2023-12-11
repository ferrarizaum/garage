/**
 * @swagger
 * components:
 *   schemas:
 *     Owner:
 *       type: object
 *       required:
 *         - name
 *         - cellphone
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the owner
 *         cellphone:
 *           type: number
 *           description: The cellphone number of the owner
 *         address:
 *           type: string
 *           description: The address of the owner
 */

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
