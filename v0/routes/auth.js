var express = require('express');
var app = express();
var ObjectId = require('mongoose').Types.ObjectId;
var schema = require('./../schema/schema.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    schema.User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            schema.User.findOne({ 'email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('message', 'already signed up'));
                    } else {
                        var newUser = new schema.User();
                        newUser.email = email;
                        newUser.password = password;
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });    
            }
        );
    }
));

passport.use('signin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        schema.User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            if (user.password != password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user);
        });
    }
));

module.exports = (function(){
    var router = express.Router();

    router.get('/signin', function (req, res) {
        if(req.user){
            backURL=req.header('Referer') || '/';
            res.redirect(backURL);
        }
        res.render('signin.jade', {message: req.flash('message'), user: req.user});
    })

    router.get('/signup', function (req, res) {
        if(req.user){
            backURL=req.header('Referer') || '/';
            res.redirect(backURL);
        }
        res.render('signup.jade', {message: req.flash('message'), user: req.user});
    })

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true 
    }));

    router.post('/signin', passport.authenticate('signin', {
        successRedirect : '/',
        failureRedirect : '/signin',
        failureFlash : true
    }));

    router.get('/signout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    return router;
})();