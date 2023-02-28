const UserSchema = require ("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Kickasskey"

const login = async(req,res) =>{
    const {email, password} = req.body;
    try{
        const existingUser = await UserSchema.findOne({email:email});
        // console.log(existingUser._id.toString());
        if(!existingUser)
        {
            return res.status(400).json({Message: "User not found"});
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(password!= existingUser.password)
            return res.status(400).json({message : "Invalid Credentials"});

        const token = jwt.sign({email: existingUser.email, id : existingUser._id}, SECRET_KEY)
        res.status(201).json({user: email, token: token});
    }

    catch (error){
        console.log(error);
    }
}





// const register = async (req,res) =>{

//     const {username , email, password} = req.body;

//     try{
//         const existingUser = await userModel.findOne({email:email});

//         if(existingUser)
//         {
//             return res.status(400).json({Message: "User already exist"});
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const result = await userModel.create({
//             email:email,
//             password: hashedPassword,
//             username: username
//         });

//         const token = jwt.sign({email : result.email, id : result._id},SECRET_KEY);

//         res.status(201).json({user:result,token:token});

//     }catch (error){
//         console.log(error);
//     }
// }

// const login = async(req,res) =>{
//     const {email, password} = req.body;
//     try{

//         if(email!= "admin@xyz.com")
//         {
//             return res.status(400).json({Message: "User not found"});
//         }

//         if(password!= "admin")
//             return res.status(400).json({message : "Invalid Credentials"});

//         const token = jwt.sign({email: email, password : password}, SECRET_KEY);

//         res.status(201).json({user: email, token: token});
//     }
//     catch (error){
//         console.log(error);
//     }
// }


module.exports = {login};