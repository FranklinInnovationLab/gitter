var schema = require('./schema.js');

var nodeLib = new schema.Lib({name:"nodejs", description:"a web framework"});
nodeLib.save(function (err) {if (err) console.log ('Error on save!')});

var nodeReview1 = new schema.Review({lib: nodeLib, stars: 3, content: "LOLLLL"});
nodeReview1.save(function (err) {if (err) console.log ('Error on save!')});
