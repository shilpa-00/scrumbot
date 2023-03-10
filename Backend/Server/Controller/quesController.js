const QuesSchema = require("../Schema/QuesSchema");
let Ques = require('../Schema/QuesSchema');
let user = require('../Schema/UserSchema');
let Team = require('../Schema/TeamSchema');


const create = async (req, res) => {
    //To find username and team id from teamDB

    const { Ques,TeamName } = req.body;
    console.log(Ques)
    console.log(TeamName)
    // const existingUser = await user.findOne({email:req.user.email});
    const t=await Team.findOne({TeamName:TeamName})
    // console.log(t);
    const result = new QuesSchema({
        Ques: Ques,
        TeamID: t.id
    })
    // console.log("Here",result)
    try {
        const existingQuestion = await QuesSchema.findOne({ Ques: Ques });
        if (Ques != "") {
            await result.save();
            res.status(201).json({ ques: Ques,id:result._id });
        }
        else {
            return res.status(400).json({ message: "Question is empyt or Question already Exists" });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

const del = async (req, res) => {
    await Ques.findByIdAndDelete(req.params.id)
        .then(Ques => {
            res.status(201).json({ message: "Deleted", Ques });
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

const deleteAll = (req, res) => {
    Ques.deleteMany({})
        .then(() => res.json('All questions deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
};

const deleteMultiple = (req, res) => {
    const idsToDelete = req.body.ids; // Assuming the request body contains an array of question IDs to delete
    console.log(idsToDelete)
    Ques.deleteMany({ _id: { $in: idsToDelete } })
        .then(() => res.json("Questions Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
};

const findAll = async (req, res) => {
    try {
      const allQuestions = await Ques.find();
      res.json(allQuestions);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
  
  
const findAllByID = async (req, res) => {
    await Ques.find({ TeamID: req.params.id })
        .then(Ques => res.json(Ques))
        .catch(err => res.status(400).json('Error: ' + err));
}

const update = async (req, res) => {
    await Ques.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ques:req.body.Ques}))
        .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { create, del, findAllByID, update, deleteAll , deleteMultiple, findAll};