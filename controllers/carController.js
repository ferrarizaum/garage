const Car = require("../models/car");
const Owner = require("../models/owner");

// Initialize dummy data
async function initializeCarDummyData(req, res) {
  const dummyCars = [
    {
      model: "Opala Gran Luxo",
      maker: "Chevrolet",
      year: "1973",
      price: 30000,
      ownerName: "Jose Ferrari",
      ownerId: "Jose Ferrari",
    },
    {
      model: "Camaro SS",
      maker: "Chevrolet",
      year: "1969",
      price: 130000,
      ownerName: "Arlindo",
      ownerId: "Arlindo",
    },
    {
      model: "Maverick GT",
      maker: "Ford",
      year: "1974",
      price: 80000,
      ownerName: "Juquinha",
      ownerId: "Juquinha",
    },
  ];

  try {
    for (const carData of dummyCars) {
      // might be a better way to do this
      const owner = await Owner.findOne({ name: carData.ownerId });
      if (owner) {
        console.log(owner);
        console.log("" + owner.name.toString());
        carData.ownerName = owner.name;
        carData.ownerId = owner.id;
        const newCar = new Car(carData);
        await newCar.save();
      } else {
        console.log(
          `Owner ${carData.owner} not found for car ${carData.model}`
        );
      }
    }
    res.json("Dummy car data inserted successfully");
  } catch (error) {
    res.json({
      error: "Something went wrong inserting dummy car data",
      message: error.message,
    });
  }
}

module.exports = {
  //getCars,
  //createCar,
  initializeCarDummyData, //done
  //updateCar,
  //getAllCars,
  //deleteCar,
};
