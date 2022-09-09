var express = require('express');
var router = express.Router();
var conn = require('../../db');

/* GET users listing. */
router.put('/', function(req, res, next) {
	
    let sql = "UPDATE customer SET name='" + req.body.name + "', email='" + req.body.email + "', phone='" + req.body.phone + "', address='" + req.body.address + "', romodel='" + req.body.roModel + "', lat='" + req.body.latCordinate + "', lng='" + req.body.lngCordinate + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) {
			res.send(JSON.stringify({ status: 404, error: err }))
		};
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

module.exports = router;

