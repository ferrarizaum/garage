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
  try {
    const userName =  req.body.name;
    const deletedUser = await User.findOneAndDelete({ name: userName });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//update user
async function updateUser(req, res) {
  try {
    const userName = req.params.name;
    if (!userName) {
      return res.status(400).json({ message: "User name is required for update" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { name: userName },
      { $set: req.body }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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
    {
      name: "lucas",
      email: "lucas@gmail.com",
      password: "admin654",
      isAdmin: true,
    },
    
  ];

  try {
    for (const userData of dummyUsers) {
      const newUser = new User(userData);
      await newUser.save();
    }
    console.log("Dummy user data inserted succesfully");
  } catch (error) {
    console.log({ "Something went wrong inserting user data": error });
  }
}

module.exports = {
  getUsers, //done
  createUser, //done
  initializeUserDummyData, //done
  updateUser, //done
  deleteUser, //done
};
