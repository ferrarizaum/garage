const Car = require("../models/car");

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

//delete car
async function deleteCar(req, res) {
  try {
    const carName =  req.body.name;
    const deletedCar = await Car.findOneAndDelete({ name: carName });
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully", deletedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//update car
async function updateCar(req, res) {
  try {
    const carName = req.params.name;
    if (!carName) {
      return res.status(400).json({ message: "Car name is required for update" });
    }

    const updatedCar = await Car.findOneAndUpdate(
      { name: ownerName },
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

//get all cars
async function getCars(req, res) {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

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
  ];

  try {
    for (const carData of dummyCars) {
      const newCar = new Car(carData);
      await newCar.save();
    }
    res.json("Dummy car data inserted succesfully");
  } catch (error) {
    res.json({ "Something went wrong inserting dummy car data": error });
  }
  
}

module.exports = {
  createCar, //done
  deleteCar, //done
  updateCar,//done
  getCars,//done
  initializeCarDummyData, //done
};
