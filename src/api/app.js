const bodyParser = require("body-parser"),
      cors = require("cors"),
      express = require("express"),
      LocalStrategy = require("passport-local"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      User = require("./models/user");

const authRoutes = require("./routes/auth"),
      postsRoutes = require("./routes/posts"),
      usersRoutes = require("./routes/users");

mongoose.connect("mongodb://localhost/KittenOverflow", { useNewUrlParser: true, useUnifiedTopology: true });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => res.json({ hello: "world" }));

app.all("*", (req, res) => res.status(404).send("Not Found"));

app.listen(3000, console.log("API server is live!"));

module.exports = app;