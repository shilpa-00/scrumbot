const TeamSchema = require("../Schema/TeamSchema");
let Team = require('../Schema/TeamSchema');
let user = require('../Schema/UserSchema');
let ScheduleSchema = require('../Schema/ScheduleSchema');
const scheduler = require('node-schedule');

const create = async (req, res) => {

    const { TeamName, date, time } = req.body;
    const t = await Team.findOne({ TeamName: req.body.tname });
    const result = new ScheduleSchema({
        TeamName: TeamName,
        date: date,
        time: time,
    });

    try {
        if (!TeamName || !date || !time) {
            return res.status(400).json({ message: "Unable to schedule. Please provide all required fields." });
        } else {
            await result.save();
            //Need to schedule as per needs
            const job = scheduler.scheduleJob('* * * * * *', function(){
                console.log('The answer to life, the universe, and everything!');
            });
            setTimeout(()=>scheduler.gracefulShutdown(),1000)
            res.status(201).json({ message: "Scheduled" });
            
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to schedule" });
    }
}

module.exports = { create };
