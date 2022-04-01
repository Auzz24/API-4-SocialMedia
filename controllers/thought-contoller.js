const { Thought, User } = require('../models');

const thoughtController = {

  createThought (req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
         return res.status(404).json({ message: 'Thought created but No User found' });
        }
        res.json({ message: 'Thought Succesfully created' });
      })
      .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
      })
  },

  getAllThought(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body)
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with that ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  //dextructured reqests to params and body, now its req.body req.params
  createReaction({ params, body }, res) {
    //
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionid } } },
      { runValidators: true, new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};




module.exports = thoughtController; 
