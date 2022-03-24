const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        match: '/^.{1,280}$/'
    },
    username:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

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
        replies:[ReactionSchema]
    }
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;