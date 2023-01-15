var MongoClient = require('mongodb').MongoClient;

var successSchema = new MongoClient.Schema({
   Name : String,
   date : Date,
   time : Date
});
module.exports = MongoClient.model(
    'success',successSchema,'Success'
);