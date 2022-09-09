var express = require('express');
var router = express.Router();
var conn = require('../../db');
const fetchuser = require('./../../middlewear/users');



//login user detail usine POST: "/getloginuser". Login required
router.get('/', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        conn.query("SELECT id, name, email, phone FROM users WHERE id=?",
        [userId],
        function (err, resp) { 
            if (err) {
                console.error("An error occurred:", err.message);
                res.status(500).json({ status: 500, message: "An error occurred: " + err.message });
            }
            else{
                if (resp.length) {
                    res.send({status: 200, response: resp[0]});
                } else {
                    //user not fond
                    res.status(404).send({ status: 404, message: "Some Error" });
                }
            }
         })



    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


module.exports = router;

