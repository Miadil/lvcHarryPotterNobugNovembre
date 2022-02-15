const express = require("express")
const mysql = require("../config/db")
const router = express.Router()

router.get("/", (req, res) => {
	const sql = "SELECT * FROM characters"
	mysql.query(sql, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			console.table(result)
			res.status(200).json(result)
		}
	})
})

router.post("/", (req, res) => {
	const bodyData = [
		req.body.firstname,
		req.body.lastname,
		req.body.image,
		req.body.house,
	]
	const sql =
		"INSERT INTO `characters` (`firstname`, `lastname`, `image`, `houses_id`) VALUES (?, ?, ?, ?)"
	mysql.query(sql, bodyData, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).json(result)
		}
	})
})

module.exports = router
