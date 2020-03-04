const express = require("express"),
      User = require("../models/user");

const router = express();

router.get("/", async(req, res) =>
{
    const users = await User.find();
    res.json(users);
});

router.get("/:id", async(req, res) =>
{
    try
    {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);        
    }
    catch (err) { res.status(400).send(err) }
});

module.exports = router;