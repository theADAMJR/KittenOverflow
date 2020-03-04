const express = require("express")
      Post = require("../models/post");;

const router = express();

router.get("/", async(req, res) => 
{
    const posts = await Post.find();

    res.json(posts);
});

router.post("/", async(req, res) =>
{
    let post = bodyToPost(req);
    if (!post)
        return res.send(400);

    await Post.create(post);

    res.redirect("/posts");
});

router.put("/:id", async(req, res) =>
{
    const post = bodyToPost(req);
    if (!post)
        return res.send(400);

    await Post.updateOne({ _id: req.params.id }, post);

    res.redirect("/posts");
});

router.delete("/:id", async(req, res) =>
{
    await Post.deleteOne({ _id: req.params.id });

    res.redirect("/posts");
});

function bodyToPost(req)
{
    let post = { title, body, authorId } = req.body;
    post.createdAt = new Date();
    return title && body ? post : null;
}

module.exports = router;