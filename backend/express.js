var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
const schedule = require('node-schedule');
var ObjectId = require('mongodb').ObjectID;
var dbname;
var date = new Date();
var today = String(date.getDate()).padStart(2, '0');
var month = String(date.getMonth() + 1).padStart(2, '0');
var year = date.getFullYear();
var curdate = `${year}-${month}-${today}`

const job = schedule.scheduleJob('*/10 * * * * *', function () {
    console.log('cron is working');
    getTodayData();
});



function getTodayData() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbname = db.db("alertmsg");
        dbname.collection("alert").find({ date: curdate }).toArray(function (err, results) {

            if (err) throw err;
            results.forEach(function (result) {
                console.log('result', result.name)
                if (result.Name == 'abdullah') {
                    console.log('hey abdulla u have reminder')
                }
            })

        });

    });
}
 




var date = new Date();
// var curtime = date.getUTCHours() +":"+ date.getUTCMinutes()+":"+date.getUTCSeconds();
var today = String(date.getDate()).padStart(2, '0');
var month = String(date.getMonth() + 1).padStart(2, '0');
var year = date.getFullYear();
var curdate = `${year}-${month}-${today}`