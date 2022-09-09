var express = require('express');
var router = express.Router();
var conn = require('../../db');
const fetchuser = require('./../../middlewear/users');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.put('/', fetchuser, function(req, res, next) {
    const userId = req.user.id;
const password = req.body.password;
// console.log(userId)
// console.log(req)
if(!password){
/* GET users listing. */
    let sql = "UPDATE users SET name='" + req.body.name + "', phone='" + req.body.phone + "' WHERE id=" + userId;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Profile updated SuccessFully" }));
	});
}
else{
	bcrypt.hash(password, saltRounds, (err, hash) => {

		if(err){
		  console.log(err);
		}
		
	let sql = "UPDATE users SET name='" + req.body.name + "', phone='" + req.body.phone + "', password='" + hash + "' WHERE id=" + userId;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Profile updated SuccessFully" }));
	});
})
}
});

module.exports = router;

