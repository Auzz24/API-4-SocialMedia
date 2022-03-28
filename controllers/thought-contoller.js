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
    Thought.findOneAndDelete({ _id: params._id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};
  // // get one User by id
  // getUserById({ params }, res) {
  //   User.findOne({ _id: params.id })
  //     .then(dbUserData => res.json(dbUserData))
  //     .catch(err => {
  //       console.log(err);
  //       res.sendStatus(400);
  //     });
  // },
  
  //     addReaction({ params, body }, res) {
  //       Thought.findOneAndUpdate(
  //         { _id: params.thoughtId },
  //         { $push: { reaactions: body } },
  //         { new: true, runValidators: true }
  //       )
  //         .then(dbUserData => {
  //           if (!dbUserData) {
  //             res.status(404).json({ message: 'No thought found' });
  //             return;
  //           }
  //           res.json(dbUserData);
  //         })
  //         .catch(err => res.json(err));
  //     },



module.exports = thoughtController; 