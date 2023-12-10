const Owner = require("../models/owner");

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

//get all owners
async function getOwners(req, res) {
  try {
    const owners = await Owner.find({});
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

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
      address: "Sertanopolis Parana",
    },

  ];

  try {
    for (const ownerData of dummyOwners) {
      const newOwner = new Owner(ownerData);
      await newOwner.save();
    }
    res.json("Dummy owner data inserted succesfully");
  } catch (error) {
    res.json({ "Something went wrong inserting dummy owner data": error });
  }
}

module.exports = {
  createOwner, //done
  deleteOwner, //done
  updateOwner, //done
  getOwners, //done
  initializeOwnerDummyData, //done
};
