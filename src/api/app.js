const express = require("express"),
      mongoose = require("mongoose"),
      Post = require("./models/post");

const app = express();

mongoose.connect("mongodb://localhost", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => res.json({ hello: "world" }));

app.get("/posts", async(req, res) => 
{
    const posts = await Post.find();

    res.json(posts);
});

app.post("/posts", async(req, res) =>
{
    const post = bodyToPost(req.body);
    await Post.create(post);

    res.redirect("/posts");
});

function bodyToPost(body)
{
    return { title, body, author } = body;
}

app.put("/posts/:id", async(req, res) =>
{
    const post = bodyToPost(req.body);
    await Post.updateOne({ _id: req.params.id }, post);

    res.redirect("/posts");
});

app.delete("/posts/:id", async(req, res) =>
{
    await Post.deleteOne({ _id: req.params.id }, post);

    res.redirect("/posts");
});

app.listen(3000, console.log("API server is live!"));

module.exports = app;