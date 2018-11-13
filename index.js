var express = require("express")
var app = express()
var bodyParser = require("body-parser")

var PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, function () {
	console.log("Server started successfully!")
})