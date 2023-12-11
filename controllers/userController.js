/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const User = require("../models/user");

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete user by name
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedUser:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/users/{name}:
 *   put:
 *     summary: Update user by name
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: User name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User name is required for update
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
//get all users
async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/dummy/user:
 *   get:
 *     summary: Initialize dummy user data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Dummy user data inserted successfully
 *       500:
 *         description: Something went wrong inserting user data
 */
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
    {
      name: "hernandes",
      email: "hernandes@gmail.com",
      password: "user123",
      isAdmin: false,
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
