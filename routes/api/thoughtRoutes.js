const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addFriend,
  removeFriend,
} = require("../../controllers/thoughtController")

router.route("/").get(getThoughts).post(createThought);

router.route("/:userId").get(getSingleThought).put(updateThought).deleteThought

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;