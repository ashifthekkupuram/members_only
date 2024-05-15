require("dotenv").config();

const AsyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator')

const Post = require("../models/post");
const User = require("../models/user");

exports.home_get = AsyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate('author').sort({'updatedAt': -1});
    // console.log(posts)
    res.render("home", {
      posts,
    });
  } catch (error) {
    next(error);
  }
});

exports.join_club_get = (req, res, next) => {
  console.log(req.user);
  res.render("join_club_form", {
    passcode: "",
  });
};

exports.join_club_post = AsyncHandler(async (req, res, next) => {
  const passcode = req.body.passcode;
  if (passcode === "") {
    const errors = "Please enter passcode to proceed";
    return res.render('join_club_form', {
        passcode: "",
        errors,
    })
  }
  if (passcode === process.env.PASSCODE) {
    await User.findByIdAndUpdate(req.user._id, { membershipStatus: true });
    res.redirect('/')
  }else{
    const errors = "Please enter the right passcode to join"
    return res.render('join_club_form', {
        passcode,
        errors,
    })
  }
});

exports.leave_club_get = (req, res, next) => {
  res.render('leave_club')
}

exports.leave_club_post = AsyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {membershipStatus: false})
  res.redirect('/')
})

exports.create_post_get = (req, res, next) => {
  res.render('post_form', {
    post: null,
    title: 'Create'
  })
}

exports.create_post_post = [
  body('message', 'A message should atleast 10 characters and maximum 100 characters')
  .trim()
  .isLength({min: 10, max: 100})
  .escape(),
  body('content')
  .optional({values: 'falsy'})
  .escape(),
  AsyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    
    const post = new Post({
      message: req.body.message,
      content: req.body.content,
      author: req.user._id
    })

    if(!errors.isEmpty()){
      res.render('post_form', {
        post: req.body,
        errors: errors.array(),
        title: 'Create'
      })
    }else{
      await post.save()
      res.redirect('/')
    }
  })
]

exports.update_post_get = AsyncHandler(async (req, res, next)=> {
  const post = await Post.findById(req.params.id)

  if(!post){
    return res.redirect('/')
  }

  res.render('post_form', {
    title: 'Update',
    post,
  })
})

exports.update_post_post = [
  body('message', 'A message should atleast 10 characters and maximum 100 characters')
  .trim()
  .isLength({min: 10, max: 100})
  .escape(),
  body('content')
  .optional({values: 'falsy'})
  .escape(),
  AsyncHandler( async (req, res, next) => {
    const errors = validationResult(req)
    
    const post = new Post({
      message: req.body.message,
      content: req.body.content,
      author: req.user._id,
      _id: req.params.id
    })

    if(!errors.isEmpty()){
      res.render('post_form', {
        post: req.body,
        errors: errors.array(),
        title: 'Create'
      })
    }else{
      await Post.findByIdAndUpdate(req.params.id, post)
      res.redirect('/')
    }
  })
]

exports.delete_post_get = AsyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  if(!post){
    return res.redirect('/')
  }

  res.render('post_delete', {
    post,
  })
})

exports.delete_post_post = AsyncHandler(async (req,res, next) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect('/')
})