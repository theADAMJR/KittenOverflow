const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
{
    username: String,
    bio: String,
    avatarURL: String,
    tags: Array,
	createdAt: Date
})
.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);