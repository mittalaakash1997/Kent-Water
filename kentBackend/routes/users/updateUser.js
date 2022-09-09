var express = require('express');
var router = express.Router();
var conn = require('../../db');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.put('/', function(req, res, next) {

const password = req.body.npassword;

if(!password){
/* GET users listing. */
    let sql = "UPDATE users SET name='" + req.body.name + "', email='" + req.body.email + "', phone='" + req.body.phone + "', isadmin='" + req.body.userRole + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
}
else{
	bcrypt.hash(password, saltRounds, (err, hash) => {

		if(err){
		  console.log(err);
		}
		
	let sql = "UPDATE users SET name='" + req.body.name + "', email='" + req.body.email + "', phone='" + req.body.phone + "', password='" + hash + "', isadmin='" + req.body.userRole + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
})
}
});

module.exports = router;

