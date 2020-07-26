const express = require("express");
const users = express.Router();
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });
const userController = require("../controller/userController");

users.get("/addUser", userController.getAddUsers);
users.post(
  "/addUser",
  upload.single("avatar"),
  userController.validatePostNewUsers,
  userController.postAddUsers
);
users.get("/viewsUsers", userController.getViews);
users.get("/detail/:id", userController.getViewsDetailsUser);
users.post("/detail/:id",upload.single("avatar"), userController.postViewsDetailsUser);
users.get("/delete/:id", userController.getDeleteViewsDetailsUser);
users.post("/delete/:id", userController.postDeleteViewsDetailsUser);

module.exports = users;
