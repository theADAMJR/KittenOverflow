const mongoose = require("mongoose");

const userModel = mongoose.model("Campground",
{
    username: String,
    bio: String,
    tags: Array,
	createdAt: Date
});

module.exports = userModel;