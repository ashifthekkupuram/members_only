const route = require("express").Router();
const { ObjectId  } = require('mongoose').Types

const {
  home_get,
  join_club_get,
  join_club_post,
  leave_club_get,
  leave_club_post,
  create_post_get,
  create_post_post,
  update_post_get,
  update_post_post,
  delete_post_get,
  delete_post_post,
} = require("../controllers/mainController");
const IsMember = require('../middlewares/isMember')
const IsNotMember = require('../middlewares/isNotMember')
const IsAuth =  require('../middlewares/isAuth')
const IsAuthorOrAdmin = require('../middlewares/isAuthorOrAdmin')

// Home lists all the posts
route.get("/", home_get);

//Join Club GET and POST
route.get("/join_club",IsNotMember, join_club_get);
route.post("/join_club",IsNotMember, join_club_post);

//Leave Club GET and POST
route.get("/leave_club",IsMember, leave_club_get);
route.post("/leave_club",IsMember, leave_club_post);

//Create Post GET and POST
route.get("/create",IsAuth, create_post_get);
route.post("/create",IsAuth, create_post_post);

//Update Post GET and POST
route.get("/:id/update",IsAuthorOrAdmin, update_post_get);
route.post("/:id/update",IsAuthorOrAdmin, update_post_post);

//Delete Post GET and POST
route.get("/:id/delete",IsAuthorOrAdmin, delete_post_get);
route.post("/:id/delete",IsAuthorOrAdmin, delete_post_post);

module.exports = route;
