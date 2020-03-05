const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
{
    username: String,
	password: String,
    bio: String,
    avatarURL: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: Array,
	createdAt: Date
})
.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);