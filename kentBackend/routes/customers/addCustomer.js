var express = require('express');
var router = express.Router();
var conn = require('../../db');



router.post('/', function(req, res, next) {

  let data = { name: req.body.name, phone: req.body.phone, email: req.body.email, address: req.body.address, romodel: req.body.roModel, lat: req.body.latCordinate, lng: req.body.lngCordinate  };
let sql = "INSERT INTO customer SET ?";
let query = conn.query(sql, data, (err, result) => {
  if (err) {
    res.send(JSON.stringify({ status: 404, error: err }))
  }
  res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
});
});


module.exports = router;
