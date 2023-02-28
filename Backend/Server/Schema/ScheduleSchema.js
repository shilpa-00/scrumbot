const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
    date : {
        type : String,
        require : true
    },
    time : {
        type : String,
        require : true
    },
    TeamName :{
        type : String,
        require : true
    }
})

module.exports = mongoose.model("Schedule", ScheduleSchema);