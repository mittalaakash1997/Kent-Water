var express = require('express');
var router = express.Router();
var conn = require('../../db');



router.post('/', function(req, res, next) {
  
  let data = { model_id: req.body.modelId, model_name: req.body.modelName, model_pin_color: '#000000'  };
let sql = "INSERT INTO romodules SET ?";
let query = conn.query(sql, data, (err, result) => {
  if (err) throw err;
  res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
});
});


module.exports = router;
