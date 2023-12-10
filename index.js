require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const carController = require("./controllers/carController");
const ownerController = require("./controllers/ownerController");
const auth = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function dbInitialize(req, res) {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    userController.initializeUserDummyData();
    ownerController.initializeOwnerDummyData();
    carController.initializeCarDummyData();
    res.json("Database created and Dummy data inserted succesfully");
  } catch (error) {
    res.json({ "Something went wrong creating Database or inserting Dummy data": error });
  } 
}

//Installation Routes and doc Routes
app.get("/install", dbInitialize);

//Auth Routes
app.post("/api/login", auth.generateToken);

//Users Routes
app.get("/api/users", auth.verifyAdmin, userController.getUsers);
app.post("/api/users", auth.verifyAdmin, userController.createUser);
app.delete("/api/users", auth.verifyAdmin, userController.deleteUser);
app.put("/api/users/:name", auth.verifyAdmin, userController.updateUser);

//Owner Routes
app.get("/api/owners", auth.verifyToken, ownerController.getOwners);
app.post("/api/owners", auth.verifyToken, ownerController.createOwner);
app.delete("/api/owners", auth.verifyToken, ownerController.deleteOwner);
app.put("/api/owners/:name", auth.verifyToken, ownerController.updateOwner);

//Car Routes
app.get("/api/cars", auth.verifyToken, carController.getCars);
app.post("/api/cars", auth.verifyToken, carController.createCar);
app.delete("/api/cars", auth.verifyToken, carController.deleteCar);
app.put("/api/cars/:name", auth.verifyToken, carController.updateCar);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
