const express = require("express"),
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

    res.status(200).send("OK");
});

function log(req,res,next) 
{
    console.log(req.body);
    next();
}

router.post("/login", log, passport.authenticate("local", { failWithError: false }), (req, res) => 
{
    res.json({ success: true });
});

module.exports = router;