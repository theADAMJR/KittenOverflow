const mongoose = require('mongoose');

const postModel = mongoose.model('Post',
{
    title: String,
    body: String,
	authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdAt: Date
});

module.exports = postModel;