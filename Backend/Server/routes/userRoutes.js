const express = require('express')
const userRouter = express.Router();
const {login,admin} = require("../Controller/userController")

userRouter.post("/login", login);
userRouter.post("/admin", admin);
module.exports = userRouter; 