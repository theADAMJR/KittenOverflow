const bodyParser = require("body-parser"),
      express = require("express"),
      mongoose = require("mongoose"),
      Post = require("./models/post");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => res.json({ hello: "world" }));

app.get("/posts", async(req, res) => 
{
    const posts = await Post.find();

    res.json(posts);
});

app.post("/posts", async(req, res) =>
{
    let post = bodyToPost(req);
    if (!post)
        return res.send(400);

    await Post.create(post);

    res.redirect("/posts");
});

function bodyToPost(req)
{
    const post = { title, body, authorId } = req.body;
    return title && body ? post : null;
}

app.put("/posts/:id", async(req, res) =>
{
    const post = bodyToPost(req);
    if (!post)
        return res.send(400);

    await Post.updateOne({ _id: req.params.id }, post);

    res.redirect("/posts");
});

app.delete("/posts/:id", async(req, res) =>
{
    await Post.deleteOne({ _id: req.params.id });

    res.redirect("/posts");
});

app.listen(3000, console.log("API server is live!"));

module.exports = app;