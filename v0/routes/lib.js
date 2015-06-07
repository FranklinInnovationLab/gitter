var express = require('express');
var router = express.Router();
var schema = require('./../schema/schema.js');

router.get('/:lib', function(req, res, next) {
	schema.Lib.findOne({name: req.param("lib")}, function(err,lib) {
		if(!lib){res.status(404).send('Not found'); return;}
		res.render('lib', {lib: lib});
	});
});

module.exports = router;
