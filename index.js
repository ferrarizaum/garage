require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const carController = require("./controllers/carController");
const ownerController = require("./controllers/ownerController");
const auth = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 8190;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

async function dummyData(req, res) {
  try {
    userController.initializeUserDummyData();
    ownerController.initializeOwnerDummyData();
    carController.initializeCarDummyData();
    res.json("Database created and Dummy data inserted succesfully");
  } catch (error) {
    res.json({
      "Something went wrong creating Database or inserting Dummy data": error,
    });
  }
}

//Installation Routes
app.get("/dummy", dummyData);

//Auth Routes
app.post("/api/login", auth.generateToken);

//front-end integration routes
app.get("/api/cars/teste", carController.getCars);
app.get("/api/owners/teste", ownerController.getOwners);

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
