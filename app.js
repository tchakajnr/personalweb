//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const blog = "MY BLOG."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-chaka:<1997april26>@cluster0-vnyhc.mongodb.net/blogDb", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res) {
  res.render("home")
});

app.get("/home", function(req, res) {
  res.render("home")
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/blog", function(req, res) {
  Post.find({}, function(err, posts) {
    if (!err) {
      res.render("blog", {
        startingContent: blog,
        posts: posts
      });

    } else {
      console.log("An error occured!!");
    }
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/delete",function(){

});

app.post("/delete",function(){

});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/portfolio", function(req, res) {
  res.render("portfolio")
});
app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/posts/deletechykerteejnr45/:postId", function(req, res){

const requestedPostId = req.params.postId;
Post.findOne({_id: requestedPostId}, function(err, post){
 if(!err){
   Post.findByIdAndRemove(post,function(err){
     if (!err) {
       console.log("Successfully deleted");
       res.redirect("/blog");
     }else{
       console.log("An error occured");
     }


 });

}else{
  console.log("an error occured!!");
}




  // Post.findOne({_id: requestedPostId}, function(err, post){
  //   res.render("post", {
  //     title: post.title,
  //     content: post.content
  //   });
  // });

});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
