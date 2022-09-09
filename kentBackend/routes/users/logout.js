var express = require('express');
var router = express.Router();
var conn = require('../../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kentWater';
const fetchuser = require('./../../middlewear/users');


//logout user
router.post('/', fetchuser, function (req, res) {
    try {
        // console.log(req)
        const userId = req.user.id;
        conn.query("UPDATE users SET loggedin=0 WHERE id=?",
        [userId],
        function (err, resp) { 
            if (err) {
                console.error("An error occurred:", err.message);
                res.status(500).json({ status: 500, message: "An error occurred: " + err.message });
            }
            else{
                    res.send(resp);                
            }
         })



    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


module.exports = router;

