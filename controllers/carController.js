/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management
 */


const Car = require("../models/car");


/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 */
//create car
async function createCar(req, res) {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/cars:
 *   delete:
 *     summary: Delete car by model name
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedCar:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
//delete car
async function deleteCar(req, res) {
  try {
    const carName =  req.body.model;
    const deletedCar = await Car.findOneAndDelete({ model: carName });
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully", deletedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


/**
 * @swagger
 * /api/cars/{name}:
 *   put:
 *     summary: Update car by model name
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Car model name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Car model name is required for update
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
//update car
async function updateCar(req, res) {
  try {
    const carName = req.params.name;
    if (!carName) {
      return res.status(400).json({ message: "Car name is required for update" });
    }
    const updatedCar = await Car.findOneAndUpdate(
      { model: carName },
      { $set: req.body }, 
      { new: true } 
    );
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Internal server error
 */
//get all cars
async function getCars(req, res) {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/dummy/car:
 *   get:
 *     summary: Initialize dummy car data
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Dummy car data inserted successfully
 *       500:
 *         description: Something went wrong inserting dummy car data
 */
// Initialize dummy data
async function initializeCarDummyData(req, res) {
  const dummyCars = [
    {
      model: "Opala Gran Luxo",
      maker: "Chevrolet",
      year: "1973",
      price: 30000,
      ownerName: "Jose Ferrari",
    },
    {
      model: "Camaro SS",
      maker: "Chevrolet",
      year: "1969",
      price: 130000,
      ownerName: "Arlindo",
    },
    {
      model: "Maverick GT",
      maker: "Ford",
      year: "1974",
      price: 80000,
      ownerName: "Juquinha",
    },
    {
      model: "Tigra",
      maker: "Chevrolet",
      year: "1999",
      price: 20000,
      ownerName: "Lucas Rafael",
    },
    {
      model: "Mustang",
      maker: "Ford",
      year: "1969",
      price: 1500000,
      ownerName: "Hernandes Zanella",
    },
  ];

  try {
    for (const carData of dummyCars) {
      const newCar = new Car(carData);
      await newCar.save();
    }
    console.log("Dummy car data inserted succesfully");
  } catch (error) {
    console.log({ "Something went wrong inserting dummy car data": error });
  }
  
}

module.exports = {
  createCar, //done
  deleteCar, //done
  updateCar,//done
  getCars,//done
  initializeCarDummyData, //done
};
