const { Thought, User } = require('../models');

const thoughtController = {

  createThought ({ params, body }, res) {
    console.log(params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.user_id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUsertData) {
          res.status(404).json({ message: 'No User found' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
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