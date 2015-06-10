var schema = require('./schema.js');

var nodeLib = new schema.Lib({name:"nodejs", description:"a web framework", pic_url: "http://html5hive.org/wp-content/uploads/2014/06/nodejs-tutorials.png"});
nodeLib.save(function (err) {if (err) console.log ('Error on save!')});

var user = new schema.User({email: "test@test.com", password: "apple123"});
user.save(function (err) {if (err) console.log ('Error on save!')});

var nodeReview1 = new schema.Review({lib: nodeLib, stars: 3, content: "super easy db migrations, but mongo's call backs can make code look really messy.", user: user});
nodeReview1.save(function (err) {if (err) console.log ('Error on save!')});


