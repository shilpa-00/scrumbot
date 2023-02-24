const UserSchema = require ("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Kickasskey"



const login = async(req,res) =>{
    const {email, password} = req.body;
    try{

        if(email!= "admin")
        {
            return res.status(400).json({Message: "User not found"});
        }

        if(password!= "admin")
            return res.status(400).json({message : "Invalid Credentials"});

        const token = jwt.sign({email: email, password : password}, SECRET_KEY)
        res.status(201).json({user: email, token: token});  
    }

    catch (error){
        console.log(error);
    }
}


const admin = async(res,req) =>{

}































// const login = async(req,res) =>{
//     const {email, password} = req.body;
//     try{
//         const existingUser = await UserSchema.findOne({email:email});

//         if(!existingUser)
//         {
//             return res.status(400).json({Message: "User not found"});
//         }
//         const matchPassword = await bcrypt.compare(password,existingUser.password);

//         if(!matchPassword)
//             return res.status(400).json({message : "Invalid Credentials"});

//         const token = jwt.sign({email: existingUser.email, id : existingUser._id}, SECRET_KEY)
//         res.status(201).json({user: existingUser, token: token});  
//     }

//     catch (error){
//         console.log(error);
//     }
// }



module.exports = {login,admin};