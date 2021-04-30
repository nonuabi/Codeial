const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_signUp", {
    title: "Codeial | SignUP",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_signIn", {
    title: "Codeial | SignIn",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(`error in finding user in signing up :: ${err}`);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log(`error in creating user while signing up :: ${err}`);
          return;
        }
        return res.redirect("/user/sign-in");
      });
    } else {
      res.redirect("/user/sign-in");
    }
  });
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};
