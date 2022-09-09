var express = require('express');
var router = express.Router();
var conn = require('../../db');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    let sql = "SELECT * FROM romodules WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

module.exports = router;

