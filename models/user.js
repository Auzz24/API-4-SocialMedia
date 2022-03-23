const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName:{
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    email:{
        type: String, 
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'This is not a valid emial']
    },
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    firends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
});

PizzaSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce(
      (total, thought) => total + thought.replies.length + 1,
      0
    );
  });

const User = model('User', UserSchema);

module.exports = User;