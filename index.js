require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const auth = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get("/api/dummy", userController.initializeDummyData);
app.get("/api/users", userController.getUsers);
app.post("/api/users", userController.createUser);
app.delete("/api/users/:id", userController.deleteUser);
app.put("/api/users/:id", userController.updateUser);
app.post("/api/login", auth.generateToken);
// Import the JWT middleware
const verifyToken = require("./middlewares/auth");

// Protected routes
app.get("/protected-route", auth.verifyToken, (req, res) => {
  // The user is authenticated; you can access user information via req.user
  res.json({ message: "Authenticated", user: req.user });
});

// Add more CRUD routes as needed (e.g., PUT and DELETE)

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
