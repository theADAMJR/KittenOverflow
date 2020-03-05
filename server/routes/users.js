const express = require('express'),
      jwt = require("jsonwebtoken"),
      middleware = require("../middleware"),
      User = require('../models/user');

const router = express();

router.get('/', async(req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);        
    } catch (err) { res.status(400).send(err) }
});

router.patch('/:id', middleware.validateSelfUser, async(req, res) => {
    try {
        await User.updateOne(req.params.id, req.body);
        res.status(202).send("Success!");
    } catch (err) { res.status(400).send(err) }
});

router.get("/:id/follow", async(req, res) => {
    try {
        const token = req.headers.authorization;
        const userId = jwt.decode(token)._id;        

        const followee = await User.findById(req.params.id);
        const follower = await User.findById(userId);
        
        if (!canFollow(followee, follower))
            throw Error();
                
        followee.followers.push(userId);
        follower.following.push(req.params.id);

        await User.updateOne({ _id: req.params.id }, followee);
        await User.updateOne({ _id: userId }, follower);        

        res.status(203).send("Success!");
    }
    catch { return res.status(400).send("Bad Request"); }
});

function canFollow(followee, follower) {
    return followee._id !== follower._id && !follower.following.includes(followee._id);
}

router.get("/:id/unfollow", async(req, res) => {
    try {
        const token = req.headers.authorization;
        const userId = jwt.decode(token)._id;
    
        const followee = await User.findById(req.params.id);
        const follower = await User.findById(userId);

        if (!canUnfollow(followee, follower))
            throw Error();

        const followeeIndex = followee.followers.indexOf(req.params.id);
        const followerIndex = follower.followers.indexOf(userId);

        followee.followers.splice(followerIndex, 1);
        follower.following.splice(followeeIndex, 1);

        await User.replaceOne({ _id: req.params.id }, followee);
        await User.replaceOne({ _id: userId }, follower);
        
        res.status(203).send("Success!");
    }
    catch { return res.status(400).send("Bad Request"); }
});

function canUnfollow(followee, follower) { 
    return followee._id != follower._id && follower.following.includes(followee._id);
}

module.exports = router;