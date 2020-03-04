const express = require("express"),
      jwt = require('jsonwebtoken'),
	  passport = require("passport"),
	  User = require("../models/user");

const router = express.Router();

const setup = (username) => (
{
    username: username,
    bio: "No bio set.",
    avatarUrl: "",
    tags: [],
    createdAt: new Date() 
});

router.post("/sign-up", async(req, res) => 
{
    const newUser = new User(setup(req.body.username));
    
    try {
        await User.register(newUser, req.body.password);
        const token = jwt.sign({ _id: newUser._id }, 'secret' , { expiresIn : '3h' });
        return res.status(201).json(token);
    }
    catch (err) { return res.status(400).send(err) }
});

router.post("/login", passport.authenticate("local", { failWithError: false }), async(req, res) => 
{
    const user = await User.findOne({ username: req.body.username }); 
    if (!user)
        return res.status(400).json({ message:' Invalid Credentials' });

    const token = jwt.sign({ _id: user._id }, 'secret' , { expiresIn : '3h' });
    return res.status(200).json(token);
});

module.exports = router;