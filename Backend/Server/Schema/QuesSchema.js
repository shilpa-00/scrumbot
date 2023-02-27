const mongoose = require('mongoose');

const QuesSchema = mongoose.Schema({
    Ques : {
        type : String,
        require : true
    },
    TeamID : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model("Ques", QuesSchema);