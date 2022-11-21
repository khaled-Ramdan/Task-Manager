const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/errror-handler")
require("dotenv").config()
const taskRoutes = require("./routes/tesks")
const PORT = process.env.PORT || 3000
//middleware
app.use(express.json()) // have to use this to have data in req.body
app.use(express.static("./public"))
app.use("/api/v1/tasks", taskRoutes)
app.use(notFound)
app.use(errorHandlerMiddleware)
//start server
const start = async () => {
	// will only make server worrk if the db connection is successful
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(PORT, (req, res) => {
			console.log(`server listening on ${PORT}......`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
