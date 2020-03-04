const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const postModel = mongoose.model("Campground",
{
    title: String,
    body: String,
	authorId: String,
	createdAt: Date
});

module.exports = postModel;