const req = require('express/lib/request');
const { User, Thought } = require('../models');

module.exports = {
  // Get all courses
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
    })
    .then((user) =>
    !user
      ? res.status(404).json({
          message: 'No user with that ID',
        })
      : res.json('Thought created')
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    console.log('You are DELETING a REACTION');
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.body.reactionId } } },
    { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID' })
        : res.json({ message: 'deleted' })
    )
    .catch((err) => res.status(500).json(err));
},

addReaction(req, res) {
  Thought.findOneAndUpdate(
  { _id: req.params.thoughtId },
  { $addToSet: { reactions: req.body } },
  { runValidators: true, new: true }
  )
  .then((thought) =>
      !thought
      ? res
          .status(404)
          .json({ message: 'No thought found with that ID' })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
}
};
