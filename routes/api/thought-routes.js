const router = require('express').Router();

// const { addReaction } = require('../../controllers/thought-contoller');
const{
    createThought, 
    getAllThought,
    deleteThought
    // addReaction
    // getThoughtById,
    // createThoughtByUserID,
    // updateThoughtByID,
    // deleteThoughtByID
} = require('../../controllers/thought-contoller');

router 
.route('/')
.post(createThought)
.get(getAllThought)

router
  .route('/:id')
  .delete(deleteThought)
//   .put(addThought)
//   .put(addReaction)

module.exports = router;