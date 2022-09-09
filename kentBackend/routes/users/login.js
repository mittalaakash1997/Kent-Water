var express = require('express');
var router = express.Router();
var conn = require('../../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kentWater';
const fetchuser = require('./../../middlewear/users');



router.post('/', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Cannot be blank').exists()
], function (req, res) {
    let success = false;
    //if there are errors return bad request and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        conn.query("SELECT * FROM users WHERE email=?",
        [email],
        function (err, resp) { 
            if (err) {
                console.error("An error occurred:", err.message);
                res.status(500).json({ status: 500, message: "An error occurred: " + err.message });
            }
            else{
                if (resp.length) {
                    //user fond
                    // res.status(200).json({ status: 200, message: resp[0].password });
                    let user = resp[0];
                    let isadmin = resp[0].isadmin;
                    let userName = resp[0].name;
                     bcrypt.compare(password, resp[0].password, (error, response) =>{
                        
                         if (!response) {
                             success = false;
                             return res.status(400).json({ success, error: "please enter Correct Details" });
                         }
                         else{
                            //  return res.status(200).json({ success, response: user });
                            conn.query("UPDATE users SET loggedin=1 WHERE email=?",
                            [email],
                            function (err, resp) { 
                                if (err) {
                                    console.error("An error occurred:", err.message);
                                    res.status(500).json({ status: 500, message: "An error occurred: " + err.message });
                                }
                            })
                            const data = {
                                user: {
                                    id: user.id
                                }
                            }
                            const authToken = jwt.sign(data, JWT_SECRET);
                            success = true;
                        res.json({ success, authToken, isadmin, userName });


                         }
                     });
                } else {
                    //user not fond
                    success=false;
                    res.status(404).send({ status: 404, success, error: "User Not Found with this Email ID" });
                }
            }
         }
        )


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }


});



module.exports = router;

