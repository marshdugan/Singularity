const express = require("express");
const morgan = require('morgan')
const mongoose = require("mongoose");
const routes = require("./routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://" + process.env.DBUSER + ":" + process.env.DBPASS + "@ds129018.mlab.com:29018/heroku_g9r80cft");

//Passport and dependencies
const passport     = require('./passport');
const session      = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
  key: 'user_sid',
  secret: process.env.MYSECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || "mongodb://" + process.env.DBUSER + ":" + process.env.DBPASS + "@ds129018.mlab.com:29018/heroku_g9r80cft", 
    ttl: 14 * 24 * 60  * 60, }),
  resave: false,
  saveUninitialized: false,

}));
app.use(passport.initialize());
app.use(passport.session());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});