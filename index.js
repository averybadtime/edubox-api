var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var cors = require("cors")
var formData = require("express-form-data")
var os = require("os")

var options = {
	uploadDir: os.tmpdir(),
	autoClean: true
}

var administrativeUsersRoutes = require("./routes/administrative/users")
var PORT = 3000

app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/api", administrativeUsersRoutes)

app.listen(PORT, function () {
	console.log("Server started successfully!")
})