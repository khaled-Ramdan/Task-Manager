const mongoose = require("mongoose")
/*
this schema is to tell db the structure of object
help us in controller and use model directly
only properities that you set in the schema will be
considerd in the DB
*/
const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must provide name"],
		trim: true,
		maxlength: [20, "name can't exceed 20 characters"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model("Task", TaskSchema)
