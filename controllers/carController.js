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
    const carName = req.body.model;
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

//update car
async function updateCar(req, res) {
  try {
    const carName = req.params.name;
    if (!carName) {
      return res
        .status(400)
        .json({ message: "Car name is required for update" });
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
      description: "Wild Brazilian 6 inline",
      image:
        "https://lartbr.com.br/wp-content/uploads/2023/05/677A542A-C7EA-45CD-9E5B-E037FE308638.jpeg",
    },
    {
      model: "Camaro SS",
      maker: "Chevrolet",
      year: "1969",
      price: 130000,
      ownerName: "Arlindo",
      description: "I hate new camaros",
      image: "https://lartbr.com.br/wp-content/uploads/2022/08/IMG_7487.jpg",
    },
    {
      model: "Maverick GT",
      maker: "Ford",
      year: "1974",
      price: 80000,
      ownerName: "Juquinha",
      description: "Nice American 302",
      image: "https://lartbr.com.br/wp-content/uploads/2022/12/IMG_8856.jpg",
    },

    {
      model: "Mustang",
      maker: "Ford",
      year: "1969",
      price: 1500000,
      ownerName: "Hernandes Zanella",
      description: "Mustang is a Mustang",
      image: "https://lartbr.com.br/wp-content/uploads/2022/07/IMG_9617.jpg",
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
  updateCar, //done
  getCars, //done
  initializeCarDummyData, //done
};
