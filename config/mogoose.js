const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/batch12");

const db = mongoose.connection;

db.once('open',function(err){
    if(err){
        console.log("Db not connected");
    }
    console.log("Db is connected");
})

module.exports = db;