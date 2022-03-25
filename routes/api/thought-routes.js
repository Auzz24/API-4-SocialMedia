const router = require('express').Router();

// const { addReaction } = require('../../controllers/thought-contoller');
const{
    addThoughts
    // addReaction
    // getThoughtById,
    // createThoughtByUserID,
    // updateThoughtByID,
    // deleteThoughtByID
} = require('../../controllers/thought-contoller');

router 
.route('/')
.post(addThoughts)
// .get(getAllUser)

router
  .route('/:userId/:thoughtId')
//   .put(addThought)
//   .put(addReaction)

module.exports = router;