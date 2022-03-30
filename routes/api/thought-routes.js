const router = require('express').Router();

const{
    createThought, 
    getAllThought,
    deleteThought,
    createReaction,
    getThoughtById,
    // createThoughtByUserID,
    updateThought
    // deleteThoughtByID
} = require('../../controllers/thought-contoller');

router 
.route('/')
.post(createThought)
.get(getAllThought)

router
  .route('/:id')
  .delete(deleteThought)
  .get(getThoughtById)
  .put(updateThought)
//   .put(addThought)
//   .put(addReaction)

router
.route('/:id/:userID')
.post(createReaction)

module.exports = router;