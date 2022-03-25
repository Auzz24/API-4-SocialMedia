const { Thought, User } = require('../models');

const thoughtController = {

  addThoughts ({ params }, res) {
    console.log(params);
    Thought.create()
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
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

}

module.exports = thoughtController; 