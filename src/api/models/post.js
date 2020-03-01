const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const campgroundModel = mongoose.model("Campground",
{
    title: String,
    body: String,
	author:
	{
		id: { type: ObjectId, ref: "User" },
		username: String
	}
});

module.exports = campgroundModel;