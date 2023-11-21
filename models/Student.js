const mongoose = require('mongoose');

const AdminImages = "/uploads";
const multer = require('multer');

const path = require('path');


const StudentS = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true 
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    adminImage : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    }
})


const imageStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,"..",AdminImages))
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now())
    }
})

StudentS.statics.uploadedImage = multer({storage : imageStorage }).single('adminImage');
StudentS.statics.imageModelPath = AdminImages;


const Student = mongoose.model('Student',StudentS);


module.exports = Student;
