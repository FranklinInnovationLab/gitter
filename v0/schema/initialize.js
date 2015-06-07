var schema = require('./schema.js');

var nodeLib = new schema.Lib({name:"nodejs", description:"a web framework"});
nodeLib.save(function (err) {if (err) console.log ('Error on save!')});

var nodeReview1 = new schema.Review({lib: nodeLib, stars: 3, content: "super easy db migrations, but mongo's call backs can make code look really messy."});
nodeReview1.save(function (err) {if (err) console.log ('Error on save!')});
