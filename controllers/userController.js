const User = require("../models/user");

//create user
async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
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

//get all users
async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//initialize dummy data
async function initializeUserDummyData(req, res) {
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

module.exports = {
  getUsers, //done
  createUser, //done
  initializeUserDummyData, //done
  updateUser, //done
  deleteUser, //done
};
