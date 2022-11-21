const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const {
	createCustomError,
} = require("../errors/custom-error")
const getAllTasks = asyncWrapper(async (req, res) => {
	const allTasks = await Task.find({})
	res.status(200).json(allTasks)
})

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body)
	res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params
	const task = await Task.findOne({ _id: taskID })
	console.log(task)
	if (!task) return next(createCustomError("NotFound", 404))
	res.status(200).json(task)
})

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params
	const task = await Task.findOneAndUpdate(
		{ _id: taskID },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	)
	if (!task) {
		return res
			.status(404)
			.json({ msg: `NO task with id:  ${taskID}` })
	}
	res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params
	const task = await Task.findOneAndDelete({
		_id: taskID,
	})
	if (!task) {
		return res
			.status(404)
			.json({ msg: "No such task with id " + taskID })
	}
	res.status(200).json({ task })
})
module.exports = {
	getAllTasks,
	getTask,
	updateTask,
	deleteTask,
	createTask,
}
