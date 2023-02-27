const express = require('express')
const userRouter = express.Router();
const {login} = require("../Controller/userController")

userRouter.post("/login", login);

module.exports = userRouter; 