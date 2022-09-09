var express = require('express');
var router = express.Router();
var conn = require('../../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let sql = "SELECT customer.* , romodules.model_pin_color FROM customer LEFT JOIN romodules ON customer.romodel = romodules.model_name";
	let query = conn.query(sql, (err, result) => {
		if (err) {res.send(JSON.stringify({err: err}))};
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});


module.exports = router;
