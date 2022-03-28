const { Schema, model, Types } = require('mongoose');


// FriendSchema = new Schema(
//     {
//         firendID: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         userName:[
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: 'User'
//             }
//         ]
    
//     }
// );

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
            ref: 'Thought'
        }
    ],
    // friends:[
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);



// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.length 
//   });

const User = model('User', UserSchema);

module.exports = User;