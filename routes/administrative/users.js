var express = require("express")
var api = express.Router()
var usersController = require("../../controllers/administrative/users")

api.post("/users/create", usersController.create)
api.post("/users/update-email-and-password", usersController.updateEmailAndPassword)

module.exports = api