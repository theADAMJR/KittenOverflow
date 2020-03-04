const bodyParser = require("body-parser"),
      cors = require("cors"),
      express = require("express"),
      LocalStrategy = require("passport-local"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      path = require("path"),
      User = require("./models/user");

const authRoutes = require("./routes/auth"),
      postsRoutes = require("./routes/posts"),
      usersRoutes = require("./routes/users");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/KittenOverflow", 
    { useNewUrlParser: true, useUnifiedTopology: true });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.get("/api", (req, res) => res.json({ hello: "world" }));
app.all("/api/*", (req, res) => res.status(404).send("Not Found"));

app.use(express.static(path.resolve("../dist/KittenBlogs")));

app.all("*", (req, res) =>
    res.status(200).sendFile(path.resolve("../dist/KittenBlogs/index.html")));

app.listen(process.env.PORT || 3000, console.log("API server is live!"));

module.exports = app;