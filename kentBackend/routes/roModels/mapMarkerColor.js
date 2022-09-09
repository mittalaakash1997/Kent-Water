var express = require('express');
var router = express.Router();
var conn = require('../../db');

/* GET users listing. */
router.put('/', function(req, res, next) {
    let sql = "UPDATE romodules SET model_id='" + req.body.modelId + "', model_name='" + req.body.modelName  + "', model_pin_color='" + req.body.modelColor + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

module.exports = router;

