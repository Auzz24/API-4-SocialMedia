const router = require('express').Router();

const{
    createThought, 
    getAllThought,
    deleteThought,
    createReaction,
    getThoughtById,
    updateThought,
    deleteReaction
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


router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router;