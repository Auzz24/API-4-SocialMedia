const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        match: '/^.{1,280}$/',
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username:{
        //how do i make sure this is linked to the correct user 
        type: String,
        required: true,
    },
    reactions:{
        replies:[ReactionSchema],
        //or like this? 
        type: Schema.Types.ObjectId,
        ref: 'reactions'
    }
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;