var express = require('express');
var User = require('../models/user');
var passport = require('passport');

var UsersAPI = express.Router();

// LOCAL PASSPORT REQUESTS
UsersAPI.post('/auth/signup',
  // passport.authenticate('local-signup', {
  //   failureRedirect: '/auth'
  // }), function(req, res, next) {
  //   res.send({signedUp: true});
  // }
  function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {

      if (err) {
        // Some error
        res.send({signedUp: false});
        return;
      }
      if (!user) {
        // Some no user error
        res.send({signedUp: false});
        return;
      }
      res.send({signedUp: true});

    })(req, res, next);
  }
);

UsersAPI.post('/auth/login',
  
  function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {

        if (err) {
          // Some error
          res.send({loggedIn: false});
          return;
        }
        if (!user) {
          // Some no user error
          res.send({loggedIn: false});
          return;
        }
        res.send({loggedIn: true});

      })(req, res, next);
    }


  // passport.authenticate('local-login', {
  //   failureRedirect: '/auth'
  // }), function(req, res, next) {
  //   res.header('isAuthenticated', 'true');
  //   res.send({loggedIn: true});
  // }
);

UsersAPI.get('/auth/logout', function(req, res, next) {
  req.logout();
  req.session.destroy(function(err) {
    if (err) { return next(err); }
    res.header('isAuthenticated', 'false');
    res.send({loggedIn: false});
  });
});

// temporary for testing
UsersAPI.get('/', function(req, res) {
  User.all()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      console.log('Users GET users/ Error-', err);
      res.status(400).send();
    });
});

// GOOGLE PASSPORT REQUESTS
// UsersAPI.get('/auth/google',
//   passport.authenticate('google', {
//     scope: [
//       'https://www.googleapis.com/auth/plus.login',
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//       'https://www.googleapis.com/auth/plus.profile.emails.read'
//     ]
//   })
// );
//
// UsersAPI.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/auth' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


// FACEBOOK PASSPORT REQUESTS
// UsersAPI.get('/auth/facebook',
//   passport.authenticate('facebook'));
//
// UsersAPI.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/auth' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
//
// UsersAPI.get( '/auth/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: '/auth/google/success',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// LOCAL PASSPORT REQUESTS

// UsersAPI.post('/auth/signup',
//   passport.authenticate('local', { failureRedirect: '/auth' }),
//   function(req, res) {
//     res.redirect('/');
//   });
//
// UsersAPI.post('/auth/login', 
//   passport.authenticate('local', { failureRedirect: '/auth' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = UsersAPI;


