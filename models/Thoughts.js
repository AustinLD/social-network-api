const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
	{
		thoughtPost: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [
			reactionSchema
		],
		createdAt: {
			type: Date,
			default: Date.now
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
