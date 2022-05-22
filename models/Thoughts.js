const { Schema, model} = require("mongoose");
const reactionSchema = require("./reaction")
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
  {
    thoughtPost: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
      username: {
        type: String,
        required: true,
      },
      reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: "Reaction",
        }
      ],
    createdAt: {
      get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
)

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;