const { Thought, User } = require('../models');

const thoughtController = {

    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reaactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

}

module.exports = thoughtController; 