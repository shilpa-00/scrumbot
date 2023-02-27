const QuesSchema = require("../Schema/QuesSchema");
let Ques = require('../Schema/QuesSchema');
let user = require('../Schema/UserSchema');


const create = async (req, res) => {
    //To find username and team id from teamDB

    const { Ques } = req.body;
    const existingUser = await user.findOne({email:req.user.email});
    console.log(existingUser);
    const result = new QuesSchema({
        Ques: Ques,
        TeamID: existingUser.id
    })
    try {
        const existingQuestion = await QuesSchema.findOne({ Ques: Ques });
        if (Ques != "" && !existingQuestion ) {
            await result.save();
            res.status(201).json({ ques: Ques });
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
    console.log(req.params.id)
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
    Ques.deleteMany({ _id: { $in: idsToDelete } })
        .then(() => res.json('Questions deleted'))
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
        .then(() => res.json('Question updated'))
        .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { create, del, findAllByID, update, deleteAll , deleteMultiple, findAll};
