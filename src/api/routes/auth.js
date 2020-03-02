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
    passport.authenticate("local")(req, res, () => res.send(200));
});

router.post("/login", passport.authenticate("local", { failWithError: true }), (req, res) => 
{
    res.send(200);
});

module.exports = router;