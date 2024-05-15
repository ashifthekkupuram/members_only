const IsNotMember = (req, res, next) => {
    if(req.isAuthenticated() && !req.user.membershipStatus){
        return next()
    }
    res.redirect('/')
}

module.exports = IsNotMember