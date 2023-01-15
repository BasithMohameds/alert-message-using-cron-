const { ObjectId } = require('mongodb');
const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    Name : String,
    date : String,
    time : String,
})
module.exports = mongoose.model("user",userSchema);