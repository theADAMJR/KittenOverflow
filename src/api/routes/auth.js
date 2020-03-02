const express = require("express"),
	  passport = require("passport"),
	  User = require("../models/user");

let router = express.Router();

router.post("/sign-up", async(req, res) => 
{
    var newUser = new User({ username: req.body.username, avatar: null });
    
	await User.register(newUser, req.body.password);
    passport.authenticate("local")(req, res, () => res.send(200));
});

router.post("/login", passport.authenticate("local", { failWithError: true }), (req, res) => 
{
    res.send(200);
});

module.exports = router;