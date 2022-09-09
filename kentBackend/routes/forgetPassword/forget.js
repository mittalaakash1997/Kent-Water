var express = require('express');
var router = express.Router();
var conn = require('../../db');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const saltRounds = 10;


const JWT_SECRET = 'kentWater';


/* GET users listing. */
router.post('/', function(req, res, next) {
    const { email } = req.body;
    conn.query("SELECT * FROM users WHERE email=?",
    [email],
    function (err, resp) { 
        if (err) {
            console.error("An error occurred:", err.message);
            res.status(500).json({ status: 500, message: "An error occurred: " + err.message });
        }
        else{
            if (resp.length) {
             //now create One Time Link to reset password
                const secret = JWT_SECRET + resp[0].password
                const payload = {
                    email: resp[0].email,
                    id: resp[0].id
                }
                const token = jwt.sign(payload, secret, {expiresIn: '15m'})
                const link = `http://192.168.1.49:9001/forgetPassword/${resp[0].id}/${token}`
                console.log(link)
                success=true;
                res.send({ status: 200, success, response: "Password Reset link has been send to your Email ID" })

            } else {
                //user not fond
                success=false;
                res.status(404).send({ status: 404, success, error: "User Not Found with this Email ID" });
            }
        }
     }


    )
});


// router.post('/:id/:token', function(req, res, next) {
//     const {id, token} = req.params;
//     conn.query("SELECT * FROM users WHERE id=?",
//     [id],
//     function (err, resp) { 
//         if (err) {
//             console.error("An error occurred:", err.message);
//             res.status(500).json({ status: 500, message: "An error occurred: " + err.message });
//         }
//         else{
//             if (resp.length) {
//              //now create One Time Link to reset password
//              const secret = JWT_SECRET + resp[0].password
//                 try {
//                     const payload = jwt.verify(token, secret)
//                     bcrypt.hash(password, saltRounds, (err, hash) => {

//                         if(err){
//                           console.log(err);
//                         }
                        
//                     let sql = "UPDATE users SET password='" + hash + "' WHERE id=" + id;
//                     let query = conn.query(sql, (err, result) => {
//                         if (err) throw err;
//                         res.send(JSON.stringify({ status: 200, error: null, response: "Profile updated SuccessFully" }));
//                     });
//                 })
//                 } catch (error) {
//                     console.log(error.message)
//                     res.send(error.message)
//                 }
//             } else {
//                 //user not fond
//                 success=false;
//                 res.status(404).send({ status: 404, success, error: "User Not Found" });
//             }
//         }
//      }
// })
module.exports = router;

