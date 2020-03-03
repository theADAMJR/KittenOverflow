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
    
    try { await User.register(newUser, req.body.password) }
    catch (err) { return res.status(400).send(err) }

    const token = jwt.sign({ username: newUser.username }, 'secret' , { expiresIn : '3h' });
    return res.status(201).json(token);
});

router.post("/login", passport.authenticate("local", { failWithError: false }), async(req, res) => 
{
    const user = await User.findOne({ username: req.body.username }); 
    if (!user)
        return res.status(400).json({ message:' Invalid Credentials' });

    const token = jwt.sign({ username: req.body.username }, 'secret' , { expiresIn : '3h' });
    return res.status(200).json(token);
});

module.exports = router;