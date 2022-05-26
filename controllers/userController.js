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
  .select("-__v")
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
  User.findOne({ _id: req.params.userId })
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
  User.findOneAndRemove(
    { _id: req.params.userId },
    { runValidators: true, new: true }
  )
    .then((user) =>
    res.json("user deleted")
    )
    .catch((err) => res.status(500).json(err));
},
// Update a User
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No User with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: {friends:req.params.friendId} },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No User with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));

},

deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: {friends: {$in:req.params.friendId}}},
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No User with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
}
};

module.exports = userController