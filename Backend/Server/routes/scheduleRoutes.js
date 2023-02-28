const express = require('express')
const scheduleRouter = express.Router();
const {create} = require("../Controller/scheduleController")

scheduleRouter.post("/create", create);
module.exports = scheduleRouter;