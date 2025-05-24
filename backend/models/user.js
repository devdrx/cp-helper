const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {        
        type: Date,
        default: Date.now,
    },
    codeforcesHandle: {
        type: String,
        default: null,
      },
    cfVerificationCode: {
    type: String,
    default: null,
    },
    cfVerified: {
    type: Boolean,
    default: false,
    },
    cfCurrentRating : {
        type: Number,
        default: null,
    },
    cfHighestRating : {
        type: Number,
        default: null,
    },
    cfCurrentRank : {
        type: String,
        default: null,
    },
    cfHighestRank : {
        type: String,
        default: null,
    },
    cfFriends : {
        type: Number,
        default: null,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;