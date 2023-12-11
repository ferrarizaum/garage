/**
 * @swagger
 * tags:
 *   name: Owners
 *   description: Owner management
 */

const Owner = require("../models/owner");

/**
 * @swagger
 * /api/owners:
 *   post:
 *     summary: Create a new owner
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       500:
 *         description: Internal server error
 */
//create owner
async function createOwner(req, res) {
  try {
    const newOwner = new Owner(req.body);
    await newOwner.save();
    res.json(newOwner);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/owners:
 *   delete:
 *     summary: Delete owner by name
 *     tags: [Owners]
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
 *         description: Owner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedOwner:
 *                   $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Internal server error
 */
//delete owner
async function deleteOwner(req, res) {
  try {
    const ownerName =  req.body.name;
    const deletedOwner = await Owner.findOneAndDelete({ name: ownerName });
    if (!deletedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json({ message: "Owner deleted successfully", deletedOwner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/owners/{name}:
 *   put:
 *     summary: Update owner by name
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Owner name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Owner name is required for update
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Internal server error
 */
//update user
async function updateOwner(req, res) {
  try {
    const ownerName = req.params.name;
    if (!ownerName) {
      return res.status(400).json({ message: "Owner name is required for update" });
    }

    const updatedOwner = await Owner.findOneAndUpdate(
      { name: ownerName },
      { $set: req.body }, 
      { new: true } 
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json({ message: "Owner updated successfully", updatedOwner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


/**
 * @swagger
 * /api/owners:
 *   get:
 *     summary: Get all owners
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 *       500:
 *         description: Internal server error
 */
//get all owners
async function getOwners(req, res) {
  try {
    const owners = await Owner.find({});
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @swagger
 * /api/dummy/owner:
 *   get:
 *     summary: Initialize dummy owner data
 *     tags: [Owners]
 *     responses:
 *       200:
 *         description: Dummy owner data inserted successfully
 *       500:
 *         description: Something went wrong inserting dummy owner data
 */
async function initializeOwnerDummyData(req, res) {
  const dummyOwners = [
    {
      name: "Jose Ferrari",
      cellphone: 999999999,
      address: "Cornelio Procopio Parana",
    },
    {
      name: "Arlindo",
      cellphone: 88888888,
      address: "Rua do rua 123",
    },
    {
      name: "Juquinha",
      cellphone: 77777777,
      address: "Cidade das Cidades numero numero",
    },
    {
      name: "Lucas Rafael",
      cellphone: 66666666,
      address: "Sertamopolis Parana",
    },
    {
      name: "Hernandes Zanella",
      cellphone: 67996653483,
      address: "Chapadão do Sul-MS",
    },
  ];

  try {
    for (const ownerData of dummyOwners) {
      const newOwner = new Owner(ownerData);
      await newOwner.save();
    }
    console.log("Dummy owner data inserted succesfully");
  } catch (error) {
    console.log({ "Something went wrong inserting dummy owner data": error });
  }
}

module.exports = {
  createOwner, //done
  deleteOwner, //done
  updateOwner, //done
  getOwners, //done
  initializeOwnerDummyData, //done
};
