const mongoose = require('mongoose');

const postimagePath = "/uploads/PostImages";



const path = require('path');

const multer = require('multer');

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postImage : {
        type : String,
        required : true
    },
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,"..",postimagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

PostSchema.statics.uploadedPostImage = multer({storage : storage }).single('postImage');
PostSchema.statics.imagePath = postimagePath;


const Post = mongoose.model("Post",PostSchema);

module.exports = Post;