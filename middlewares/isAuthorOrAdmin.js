const Post = require("../models/post")

const IsAuthorOrAdmin = async (req, res, next) => {
    const post = await Post.findById(req.params.id)
    if(req.isAuthenticated()){
        if(post && post.author.equals(req.user._id)){
            return next()
        }
        if(post && req.user.admin){
            return next()
        }
    }
    res.redirect('/')
}

module.exports = IsAuthorOrAdmin