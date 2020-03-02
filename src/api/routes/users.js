const express = require("express"),
      User = require("../models/user");

const router = express();

router.get("/", async(req, res) =>
{
    const users = await User.find();
    res.json(users);
});

router.get("/:id(/^[0-9a-fA-F]{24}$/)", async(req, res) =>
{
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
});

module.exports = router;