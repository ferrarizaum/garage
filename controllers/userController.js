const User = require("../models/user");

//gets all user, only admins
async function getAllUsers(req, res) {
  res.json(users);
}

//delete user
async function deleteUser(req, res) {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  users.splice(index, 1);
  res.json({ message: "User deleted" });
}

//update user
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  if (!name || !email) {
    res.status(400).json({ error: "Missing name or email" });
    return;
  }

  users[index].name = name;
  users[index].email = email;
  res.json(users[index]);
}
//-------------------------------------------------
// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Initialize dummy data
async function initializeDummyData(req, res) {
  const dummyUsers = [
    {
      name: "jose",
      email: "jose@gmail.com",
      password: "admin123",
      isAdmin: true,
    },
    {
      name: "joao",
      email: "joao@gmail.com",
      password: "user123",
      isAdmin: false,
    },
    {
      name: "maria",
      email: "maria@gmail.com",
      password: "user456",
      isAdmin: false,
    },
  ];

  try {
    for (const userData of dummyUsers) {
      const newUser = new User(userData);
      await newUser.save();
    }
    res.json("Dummy data inserted succesfully");
  } catch (error) {
    res.json({ "Something went wrong inserting data": error });
  }
}

// Export the controller functions
module.exports = {
  getUsers, //done
  createUser, //done
  initializeDummyData, //done
  updateUser, //done
  getAllUsers,
  deleteUser, //done
  // Add more controller functions as needed
};
