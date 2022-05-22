const { User, Thought } = require("../models")

const userCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

const userController = {
// CRUD COMMANDS
// CREATE A USER
// RESPOND WITH A USER BY ID
// UPDATE THE USER
// DELETE THE USER


// Get all Users
getUsers(req, res) {
  User.find()
  .then(async (users) => {
      const userObj = {
      users,
      userCount: await userCount(),
      };
      return res.json(userObj);
  })
  .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
  });
},
// Get a User
getSingleUser(req, res) {
  User.findOne({ _id: req.params.UserId })
    .select('-__v')
    .then((User) =>
      !User
        ? res.status(404).json({ message: 'No User with that ID' })
        : res.json(User)
    )
    .catch((err) => res.status(500).json(err));
},
// Create a User
createUser(req, res) {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
// Delete a User
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.UserId })
    .then((User) =>
      !User
        ? res.status(404).json({ message: 'No User with that ID' })
        : Student.deleteMany({ _id: { $in: User.students } })
    )
    .then(() => res.json({ message: 'User and students deleted!' }))
    .catch((err) => res.status(500).json(err));
},
// Update a User
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.UserId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((User) =>
      !User
        ? res.status(404).json({ message: 'No User with this id!' })
        : res.json(User)
    )
    .catch((err) => res.status(500).json(err));
},
};

module.exports = userController