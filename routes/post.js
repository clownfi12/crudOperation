const express = require('express');


const routs = express.Router();

const Post = require("../models/Post");

const postController = require('../controllers/postController');

routs.get("/", async (req,res)=>{
    return res.render('add_post');
})

routs.post("/addPostData", Post.uploadedPostImage,postController.addPostData);

routs.get("/viewPostDetails", postController.viewPostDetails);

routs.get("/deletePost/:postId", postController.deletePost);

routs.get("/updatePost/:postId", postController.updatePost);

routs.post("/EditPostData", Post.uploadedPostImage, postController.EditPostData);


module.exports = routs;