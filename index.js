const express  = require('express');

const port = 8001;

const app = express();

const mongoose = require('mongoose');

let succ =  mongoose.connect("mongodb+srv://clownfish156:clown156H@cluster0.kbl0wxq.mongodb.net/batch12",{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log(err));


const path = require('path');

const fs = require('fs');

const St = require('./models/Student');
const { unlinkSync } = require('fs');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'views'));

app.use("/uploads", express.static(path.join(__dirname,'uploads')));

app.use(express.urlencoded());

app.use("/", require("./routes"));
app.use("/post", require("./routes/post"));

app.listen(port, (err)=>{
    if(err) console.log(err);
    console.log(`server is running on port:${port}`)
})