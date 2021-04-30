const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        console.log(user);
        if (!user || user.password != password) {
          console.log("Invalid username / password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializig the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log(`error in finding user -- > passport :: ${err}`);
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is sign in then, pass on the request to
  // the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not sign in
  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //res.user contains the current signed in user from the session cookie
    //and we are just sending this to the local for the views
    res.local.user = req.user;
  }
  next();
};

module.exports = passport;