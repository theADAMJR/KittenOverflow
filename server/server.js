const api = require('./api');
      bodyParser = require('body-parser'),
      cors = require('cors'),
      express = require('express'),
      LocalStrategy = require('passport-local'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      path = require('path'),
      User = require('./models/user');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/KittenOverflow', 
    { useNewUrlParser: true, useUnifiedTopology: true });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

app.use(cors())
app.use(passport.initialize());
app.use(bodyParser.json());

app.use('/api', api);

app.use(express.static(process.env.DIST || '/app/dist/KittenBlogs'));

app.all('*', (req, res) =>
    res.status(200).sendFile(process.env.DIST + '/index.html' || '/app/dist/KittenBlogs/index.html'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API server is live on port ${port}!`));

module.exports = app;