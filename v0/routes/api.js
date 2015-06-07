var express = require('express');
var router = express.Router();
var schema = require('./../schema/schema.js');

router.get('/review/:lib', function(req, res) {
	schema.Lib.findOne({name: req.param("lib")}, function(err,lib) {
		if(!lib){res.status(404).send('Not found'); return;}
		schema.Review.find({lib: lib._id}, function(err, reviews) {
			res.jsonp({ response: reviews });
		})
	});
});

router.post('/review/:lib', function (req, res) {
	schema.Lib.findOne({name: req.param("lib")}, function(err,lib) {
		if(!lib){res.status(404).send('Not found'); return;}
		var stars = parseInt(req.body.stars);
		if (stars > 5){
			stars = 5;
		} else if (stars < 0){
			stars = 0;
		}
		var review = new schema.Review({ lib: lib._id, stars: stars, content: req.body.content });
		review.save(function (err) {
            if (err){
                res.jsonp({ success: false });
            }else{
            	res.jsonp({ success: true });
            }
        });
    })
});

module.exports = router;
