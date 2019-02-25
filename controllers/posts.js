const User = require("../models/user");
const Post = require('../models/post');

module.exports = (app) => {

    app.get('/', (req, res) => {
        const currentUser = req.user;
        console.log(req.cookies);
        Post.find().populate('author')
            .then(posts => {
                res.render('posts-index', { posts, currentUser });
            }).catch(err => {
                console.log(err.message);
            })
    })

    app.get('/posts/new', (req, res) => {
        res.render('posts-new', { currentUser })
    })

    // CREATE
    app.post("/posts/new", (req, res) => {
    if (req.user) {
      const post = new Post(req.body);
      post.author = req.user._id;

      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();

          res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return res.status(401);
    }
  });



    app.get("/posts/:id", function (req, res) {
        const currentUser = req.user;
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').populate('author')
          .populate("comments")
          .then(post => {
            res.render("posts-show", { post, currentUser });
          })
          .catch(err => {
            console.log(err.message);
          });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        const currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).populate('author')
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });

};