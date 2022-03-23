const router = require('express').Router();

const{
    getAllThought,
    getThoughtById,
    createThoughtByUserID,
    updateThoughtByID,
    deleteThoughtByID
} = require('../../controllers/thought-controller');



module.exports = router;