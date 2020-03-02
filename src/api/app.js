const bodyParser = require("body-parser"),
      express = require("express"),
      mongoose = require("mongoose");

const authRoutes = require("./routes/auth"),
      postsRoutes = require("./routes/posts"),
      usersRoutes = require("./routes/users");

mongoose.connect("mongodb://localhost", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) =>
{
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use("/", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => res.json({ hello: "world" }));

app.all("*", (req, res) => res.status(404).send("Not Found"));

app.listen(3000, console.log("API server is live!"));

module.exports = app;