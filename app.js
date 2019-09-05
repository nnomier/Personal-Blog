//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-noha:TesT123@cluster0-v01vq.mongodb.net/blogDB", {
  useNewUrlParser: true
});



const homeStartingContent = "Welcome to my blog, feel free to add anything that comes to you mind whether it's a personal story, a fun fact or just a random thought";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res) {


  Post.find({}, function(err, posts) {
    res.render("home", {
      pageTitle:"Daily Journal",
      content: homeStartingContent,
      posts: posts
    });

  });
});


app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    pageTitle: "Contact",
    content: contactContent
  });
});


app.get("/compose", function(req, res) {
  res.render("compose");
});



app.get("/posts/:postId", function(req, res) {
const requestedPostId=req.params.postId;


Post.findOne({_id: requestedPostId}, function(err, post){
  res.render("post", {
    postTitle: post.title,
    postContent: post.content
  });
});

});



app.post("/compose", function(req, res) {

  const post = new Post({
    title: req.body.newTitle,
    content: req.body.newPost
  });

  post.save(function(err) {

    if (!err) {
      res.redirect("/");
    }
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started ");
});
