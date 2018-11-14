var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var cors = require("cors")

var usersRoutes = require("./routes/users")

var PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/api", usersRoutes)

app.listen(PORT, function () {
	console.log("Server started successfully!")
})