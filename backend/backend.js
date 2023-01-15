var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var ObjectId = require("mongodb").ObjectID;
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
var schedule = require("node-cron");
const { format, zonedTimeToUtc, utcToZonedTime } = require("date-fns-tz");
const moment = require("moment");
const http = require("http").Server(app);
const port = process.env.PORT || 8080;
const io = require("socket.io")(http);

const mongoose = require("mongoose");
const user = require("./user");
mongoose.connect("mongodb://localhost:27017/alertmsg");

var dbname;
var date = new Date();
var today = String(date.getDate()).padStart(2, "0");
var month = String(date.getMonth() + 1).padStart(2, "0");
var year = date.getFullYear();
var curdate = `${year}-${month}-${today}`;

var _socket = null;
io.on("connection", (socket) => {
  _socket = socket;
});
io.on("disconnect", () => {
  console.log("disconnected from the user");
});

const cronjob = schedule.schedule("* * * * * ", function () {
  console.log("checking database for 5 minutes");
  checkTime();
});

app.get("/", function (req, res) {
  res.send(" backend api running");
});

app.get("/home", async function (req, res) {
  var userDate = req.query["date"];
  var usertime = req.query["time"];
  var Moment = moment(`${userDate} ${usertime}`);
  var userGet = Moment.toISOString();
  const User = new user({
    Name: req.query["Name"],
    date: userDate,
    time: userGet,
  });
  await User.save();
  res.send(User);
});

app.get("/home/data", function (req, res) {
  user.find(function (err, result) {
    if (err) {
      console.log("error..");
    } else {
      // console.log(result);
      res.json(result);
    }
  });
});

app.get("/home/delete/:id", function (req, res) {
  user.find({ _id: ObjectId(req.params.id) }, function (err, result) {
    if (err) {
      console.log("Error");
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

app.get("/home/data/date", function (req, res) {
  user.find({ date: curdate }, function (err, result) {
    if (err) {
      console.log("Error");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

function checkTime() {
  user.find(function (err, result) {
    if (err) {
      console.log("Error");
    } else {
      result.forEach(function (results) {
        var uTime = results.time;
        var uName = results.Name;
        var uId = results.id;
        console.log(uTime);
        var curtime = moment();
        curtime.set({ second: 0, milliseconds: 0 });
        var systemTime = curtime.toISOString();
        console.log(systemTime);
        if (uTime === systemTime) {
          _socket.emit("newMessage", `${uTime} your have reminder ${uName}`);
          console.log("you have reminder..");
        } else {
          console.log("no reminder");
        }
      });
    }
  });
}

http.listen(port, function () {
  console.log("server started");
});
