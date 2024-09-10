import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: false
    },

    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
        unique: false
    },

    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },

    avatarImage: {
        type: String,
        default: ""
    }
})

var Users = mongoose.model("users", userSchema);

export default Users