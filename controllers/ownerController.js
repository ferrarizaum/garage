const Owner = require("../models/owner");

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
  // getUsers, //done
  // createUser, //done
  initializeOwnerDummyData, //done
  // updateUser, //done
  // getAllUsers,
  // deleteUser, //done
};
