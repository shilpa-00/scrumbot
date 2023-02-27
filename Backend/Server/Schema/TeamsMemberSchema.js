const mongoose = require("mongoose");

const TeamMemberSchema = mongoose.Schema({

    TeamID :{
        type : String,
        required : true,
    },
    Username :{
        type : String,
        required : true
    },
    EmailOfTheUser :{
        type: String,
        required : true
    }
})

module.exports = mongoose.model("TeamMembers",TeamMemberSchema);