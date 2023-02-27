const express = require('express')
const jwt=require('jsonwebtoken')
const quesRouter = express.Router();
const {create,findAllByID,del, update, deleteAll, deleteMultiple, findAll} = require("../Controller/quesController")
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


quesRouter.post("/create",middle, create);
quesRouter.get("/findAllByID/:id",findAllByID);
quesRouter.get("/findAll",findAll);
quesRouter.delete("/delete/:id",del);
quesRouter.post("/update/:id",update);
quesRouter.post("/deleteAll",deleteAll);
quesRouter.post("/deleteMultiple",deleteMultiple);
module.exports = quesRouter;