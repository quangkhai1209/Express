const shortid = require("shortid");
const db = require("../db");
const bcrypt = require('bcrypt');

module.exports.getAddUsers = (req, res) => {
  res.render("users/index");
};

module.exports.postAddUsers = async (req, res) => {
  const {
    email, password, fullName, address, phoneNumber, age, level
  } = req.body;
  const postData = {
    email, password : await bcrypt.hash(password, 10), fullName, address, phoneNumber, age, level, id: shortid.generate(), wrongLoginCount: 0
  };
  if (req.file) {
    const avatar = req.file.path.split("\\").slice(1).join("/");
    postData.avatar = avatar;
    postData.id = shortid.generate();
    let errs = [];
    let temp = db
      .get("users")
      .value()
      .find((item) => {
        return item.email == email;
      });
    if (!temp) {
      db.get("users").push(postData).write();
      res.redirect("/admin/manage/users/viewsUsers");
    } else {
      errs.push("Email had registered.");
      res.render("users/index", {
        errs: errs,
        values: postData,
      });
    }
  } else {
    let errs = [];
    errs.push("Avatar is require !!!");
    res.render("users/index", {
      errs: errs,
      values: postData,
    });
  }
};

module.exports.getViews = (req, res) => {
  const { name } = req.query;
  if (name) {
    const users = db
      .get("users")
      .value()
      .filter((user) => {
        return user.level == 0 && user.fullName.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      });
    res.render("users/views", {
      users: users,
    });
  }
  else {
    const users = db
      .get("users")
      .value()
      .filter((user) => {
        return user.level == 0;
      });
    res.render("users/views", {
      users: users,
    });
  }
};


module.exports.getViewsDetailsUser = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .value()
    .find((item) => {
      return item.id === id;
    });
  res.render("users/detail", {
    values: user,
  });
};

module.exports.postViewsDetailsUser = (req, res, next) => {
  const id = req.params.id;
  const {
    email,
    password,
    fullName,
    address,
    phoneNumber,
    age,
    wrongLoginCount,
  } = req.body;

  const data = { email, password, fullName, address, phoneNumber, age, wrongLoginCount };

  if (req.file) {
    data.avatar = req.file.path.split("\\").slice(1).join("/");
  }

  if (data.password && data.avatar) {
    db.get("users")
      .find({ id })
      .assign({
        data
      })
      .write();
    res.redirect("/admin/manage/users/viewsUsers");
  }

  if (data.password && !data.avatar) {
    db.get("users")
      .find({ id })
      .assign({
        email,
        password,
        fullName,
        address,
        phoneNumber,
        age,
        wrongLoginCount,
      })
      .write();
    res.redirect("/admin/manage/users/viewsUsers");
  }

  if (!data.password && data.avatar) {
    db.get("users")
      .find({ id })
      .assign({
        email,
        fullName,
        address,
        phoneNumber,
        age,
        wrongLoginCount,
        avatar: data.avatar,
      })
      .write();
    res.redirect("/admin/manage/users/viewsUsers");
  }

  if (!data.password && !data.avatar) {
    db.get("users")
      .find({ id })
      .assign({ email, fullName, address, phoneNumber, age, wrongLoginCount })
      .write();
    res.redirect("/admin/manage/users/viewsUsers");
  }
};

module.exports.getDeleteViewsDetailsUser = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .value()
    .find((item) => {
      return item.id === id;
    });
  res.render("users/delete", {
    values: user,
  });
};

module.exports.postDeleteViewsDetailsUser = (req, res) => {
  const { id } = req.params;
  db.get("users").remove({ id }).write();
  res.redirect("/admin/manage/users/viewsUsers");
};

module.exports.validatePostNewUsers = (req, res, next) => {
  let err = [];
  const {
    email,
    password,
    fullName,
    address,
    phoneNumber,
    age,
    level,
    avatar,
  } = req.body;
  const data = {
    email,
    password,
    fullName,
    address,
    phoneNumber,
    age,
    level,
    avatar,
  };
  if (!email) {
    err.push("Email is require !!!");
  }
  if (!password) {
    err.push("Password is require !!!");
  }
  if (!fullName) {
    err.push("Name is require !!!");
  }
  if (!address) {
    err.push("Address is require !!!");
  }
  if (!phoneNumber) {
    err.push("Phone number is require !!!");
  }
  if (!age) {
    err.push("Age is require !!!");
  }
  if (err.length) {
    res.render("users/index", {
      values: data,
      errs: err,
    });
    return;
  }
  next();
};
