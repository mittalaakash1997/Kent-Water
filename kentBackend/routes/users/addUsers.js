var express = require('express');
var router = express.Router();
var conn = require('../../db');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post('/', function (req, res, next) {

  const name = req.body.name;
  const phone = req.body.phone;
  const isadmin = req.body.userRole;
  const email = req.body.email;
  const password = req.body.password;


  bcrypt.hash(password, saltRounds, (err, hash) => {

    if(err){
      console.log(err);
    }
    
    conn.query("INSERT INTO users (name, phone, isadmin, email, password) VALUES (?, ?, ?, ?, ?)",
      [name, phone, isadmin, email, hash],
      (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
      }
    );
  })

});


module.exports = router;
