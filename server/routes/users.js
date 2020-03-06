const express = require('express'),
      fileUpload = require('express-fileupload'),
      jwt = require('jsonwebtoken'),
      middleware = require('../middleware'),
      path = require('path'),
      User = require('../models/user');

const router = express();

router.use(fileUpload({ createParentPath: true }));

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

router.patch('/:id', middleware.validateOwner, async(req, res) => {
    try {
        await User.updateOne(req.params.id, req.body);
        res.status(202).send('Success!');
    } catch (err) { res.status(400).send(err) }
});

router.get('/:id/follow', middleware.validateUser, async(req, res) => {
    try {
        const followee = await User.findById(userId);
        const follower = res.locals.user;
        
        if (!canFollow(followee, follower))
            throw Error();
                
        followee.followers.push(userId);
        follower.following.push(req.params.id);

        await User.updateOne({ _id: req.params.id }, followee);
        await User.updateOne({ _id: follower._id }, follower);        

        res.status(203).send('Success!');
    }
    catch { return res.status(400).send('Bad Request'); }
});

function canFollow(followee, follower) {
    return followee._id !== follower._id && !follower.following.includes(followee._id);
}

router.get('/:id/unfollow', middleware.validateUser, async(req, res) => {
    try {    
        const followee = await User.findById(req.params.id);
        const follower = res.locals.user;

        if (!canUnfollow(followee, follower))
            throw Error();

        const followeeIndex = followee.followers.indexOf(req.params.id);
        const followerIndex = follower.followers.indexOf(userId);

        followee.followers.splice(followerIndex, 1);
        follower.following.splice(followeeIndex, 1);

        await User.replaceOne({ _id: req.params.id }, followee);
        await User.replaceOne({ _id: follower._id }, follower);
        
        res.status(203).send('Success!');
    }
    catch { return res.status(400).send('Bad Request'); }
});

function canUnfollow(followee, follower) { 
    return followee._id != follower._id && follower.following.includes(followee._id);
}

router.post('/upload-avatar', middleware.validateUser, (req, res) => {
    try {
        if(!req.files)
            return res.status(400).send('No file uploaded');

        const avatar = req.files.avatar;
        avatar.mv(`./uploads/${res.locals.user._id}.png`);

        res.status(201).send(`Success!`);
    } catch (err) {
        res.status(500).send(err);
        console.error(err);
    }
});

router.get('/:id/avatar', (req, res) => {
    try {
        res.setHeader('content-type', 'image/png')
        
        const root = path.resolve('./');
        res.sendFile(root + `/uploads/${req.params.id}.png`);
    } catch (err) {
        res.status(500).send(err);
        console.error(err);
    }
});

module.exports = router;