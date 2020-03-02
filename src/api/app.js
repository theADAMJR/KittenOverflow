const bodyParser = require("body-parser"),
      express = require("express"),
      mongoose = require("mongoose"),
      Post = require("./models/post");

mongoose.connect("mongodb://localhost", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) =>
{
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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
    let post = { title, body, authorId } = req.body;
    post.createdAt = new Date();
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

const users = [
    { id: "1", username: "ADAMJR", tags: ["ts", "c#", "angular"] },
    { id: "2", username: "Steve", tags: ["js", "c#", "angular"] },
    { id: "3", username: "Jeff", tags: ["ts", "c#", "angular"] },
    { id: "4", username: "Dave", tags: ["js", "c#", "angular"] }
];

app.get("/users", (req, res) =>
{
    res.json(users);
});

app.get("/users/:id", (req, res) =>
{
    const user = users.find(u => u.id === req.params.id);
    res.json(user);
});

app.get("/users/:id/follow", (req, res) =>
{
    res.send(200);
});

app.all("*", (req, res) => res.send(404));

app.listen(3000, console.log("API server is live!"));

module.exports = app;