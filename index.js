require("dotenv").config()

const cors = require("cors")
const express = require("express")
const morgan = require("morgan")
const routes = require("./routes/index")

const connection = require("./config/db")

const app = express()

const PORT = process.env.PORT || 3030
//connection test Mysql
connection.connect((err) => {
	if (err) {
		console.error("error connecting: " + err.stack)
	} else {
		console.log("connected to database with threadId :  " + connection.threadId)
	}
})
// pre-route middlewares
app.use(cors())
app.use(morgan("dev"))
// construction du req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routes
app.use("/characters", routes.characters)
app.use("/houses", routes.houses)
app.get("/", (req, res) => {
	res.status(200).send("je suis dans le / ")
})

app.listen(PORT, console.log(`http://localhost:${PORT}`))
