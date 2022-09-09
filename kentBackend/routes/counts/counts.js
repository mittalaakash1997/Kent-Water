var express = require('express');
var router = express.Router();
var conn = require('../../db');

/* GET users listing. */
router.get('/users', function(req, res, next) {
    let sql = "SELECT COUNT(*) AS totalUsers from users";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result[0].totalUsers }));
	});
});
router.get('/customers', function(req, res, next) {
    let sql = "SELECT COUNT(*) AS totalCustomer from customer";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result[0].totalCustomer }));
	});
});
router.get('/romodels', function(req, res, next) {
    let sql = "SELECT COUNT(*) AS totalRoModels from romodules";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result[0].totalRoModels }));
	});
});

module.exports = router;

