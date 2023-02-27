const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    TeamName : {
        type : String,
        require : true,
    },
    Admin : {
        type : String,
        require : true,
    },
    Count : {
        type : Number,
        require : true,
    }
})

module.exports = mongoose.model("Teams",TeamSchema);