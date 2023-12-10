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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Dummy Routes
app.get("/api/dummy/user", userController.initializeUserDummyData);
app.get("/api/dummy/owner", ownerController.initializeOwnerDummyData);
app.get("/api/dummy/car", carController.initializeCarDummyData);

//Auth Routes
app.post("/api/login", auth.generateToken);

//Users Routes
app.get("/api/users", auth.verifyAdmin, userController.getUsers);
app.post("/api/users", userController.createUser);
app.delete("/api/users/:id", userController.deleteUser);
app.put("/api/users/:id", userController.updateUser);

//Owner Routes
app.get("/api/owners", auth.verifyAdmin, ownerController.getOwners);
app.post("/api/owners", ownerController.createOwner);
app.delete("/api/owners", ownerController.deleteOwner);
app.put("/api/owners/:name", ownerController.updateOwner);

//Car Routes
app.get("/api/cars", auth.verifyAdmin, carController.getCars);
app.post("/api/cars", carController.createCar);
app.delete("/api/cars", carController.deleteCar);
app.put("/api/cars/:name", carController.updateCar);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
