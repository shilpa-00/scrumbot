const TeamSchema = require("../Schema/TeamSchema");
let Team = require('../Schema/TeamSchema');
let user = require('../Schema/UserSchema');


const create = async (req, res) => {

    const { TeamName, Count } = req.body;
    const existingUser = await user.findOne({email:req.user.email});
    // console.log(existingUser)
    const result = new TeamSchema({
        TeamName: TeamName,
        Admin: existingUser._id,
        Count: Count,
    })
    try {
        // const existingTeam = await TeamSchema.findOne({ Team: Team });
        if (Team != "" ) {
            await result.save();
            res.status(201).json({ TeamName: TeamName });
        }
        else {
            return res.status(400).json({ message: "Team is already Exists" });
        }
    }
    catch (error) {
        console.log(error.message);
    }
    // res.status(201).json({message:"Hello"});
}

const findAll = async (req, res) => {
    try {
      const allTeams = await TeamSchema.find();
      res.json(allTeams);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const update = async (req, res) => {
    const { TeamName, Count } = req.body;
  
    try {
      const existingTeam = await TeamSchema.findOne({ _id: req.params.id });
  
      if (existingTeam) {
        existingTeam.TeamName = TeamName || existingTeam.TeamName;
        existingTeam.Count = Count || existingTeam.Count;
  
        await existingTeam.save();
        res.json(existingTeam);
      } else {
        return res.status(400).json({ message: "Team not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const del = async (req, res) => {
    try {
      const deletedTeam = await TeamSchema.findByIdAndDelete(req.params.id);
  
      if (deletedTeam) {
        res.json({ message: "Team deleted", team: deletedTeam });
      } else {
        return res.status(400).json({ message: "Team not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
module.exports = { create, findAll, update, del };
