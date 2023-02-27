const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const quesRouter = require('./routes/quesRoutes');
const teamRouter = require('./routes/teamRoutes');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

//Getting the URI from .env file
const uri = process.env.ATLAS_URI;


//When strict option is set to true, Mongoose will ensure that only the 
//fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent)

mongoose.set("strictQuery", false);

//MongoDB Connection
mongoose.connect(uri)
    .then(() => {
        app.listen(port, () => {
            console.log("Server Running on port no 5000");
        });
        console.log("Connection Established")
    })
    .catch(() => {
        console.log("Error")
    })



app.use("/users", userRouter);
app.use("/ques",quesRouter);
app.use("/team",teamRouter);