const express = require('express')
const jwt=require('jsonwebtoken');
const teamRouter = express.Router();
const {create,del, findAll, update } = require("../Controller/teamController")
const SECRET_KEY = "Kickasskey"

function middle(req,res,next)
{
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send("Authorization header missing");
    }
    
    const token=authHeader.split(' ')[1]
    jwt.verify(token,SECRET_KEY,(er,data)=>{
        if(er)
        {
            console.log(er.message)
            res.status(401).send("Invalid Token")
        }
        req.user=data
    })
    next()
}

teamRouter.post("/create",middle, create);
teamRouter.post("/delete",del);
teamRouter.post("/findAll",findAll);
teamRouter.post("/update/:id",update);

module.exports = teamRouter; 