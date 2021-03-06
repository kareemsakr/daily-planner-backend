var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

//import models
require("./models/user");
require("./models/event");

//import routers
const authRouter = require("./routers/auth");
const eventRouter = require("./routers/event");
const pushTokenRouter = require("./routers/pushToken");

//import middleware
const requireAuth = require("./middleware/requireAuth");

var app = express();

//use middleware and routers
app.use(bodyParser.json());
app.use(authRouter);
app.use(eventRouter);
app.use(pushTokenRouter);

const mongoURI = process.env.DB_STRING;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", err => {
  console.log("successfully connected to mongo instance");
});

mongoose.connection.on("error", err => {
  logError(err);
});

app.get("/", requireAuth, function(req, res) {
  return res.send(req.user);
});

app.listen(PORT, () => console.log("listening on port " + PORT));
