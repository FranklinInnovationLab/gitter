var express = require('express');
var router = express.Router();
var schema = require('./../schema/schema.js');
var ObjectId = require('mongoose').Types.ObjectId;

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
		schema.User.findOne({email: req.param("email")}, function(err, user){
			schema.Review.findOne({user: user, lib: lib}, function(err, review){
				//if user have already written about review, then stop them from spamming
				if(review){
					res.jsonp({ success: false });
					return;
				}
				var review = new schema.Review({ lib: lib._id, stars: stars, content: req.body.content, user: user });
				review.save(function (err) {
            		if (err){
                		res.jsonp({ success: false });
            		}else{
            			res.jsonp({ success: true });
            		}
        		});
			});
		});
    })
});

module.exports = router;
