const express = require('express');
var md5 = require('md5');
const router = express.Router();
const mysql = require('mysql');
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../Middlewares/AuthMiddleware");
var con = mysql.createConnection({
    host: "192.163.206.200",
    user: "root",
    database: "chat-service"
});
router.post('/',  (req, res) => {
  
    const { email, password } = req.body

    const search = `SELECT * FROM registered_users  WHERE email = '${email}';`;
    con.query(search, (err, result) => {
        if (err) {
            if (err) throw err;
            //    res.json({error:`database query error:${err}`})
        }
        else {
            if (result.length == 0) {
                
                res.json({ error: 'Account Does Not Exist, PLease Create Account First' })
            }
            else {
                const user_password = `SELECT password FROM registered_users  WHERE email = '${email}';`;
                con.query(user_password, (err, result) => {
                    console.log(result)
                    let md5Pasword = md5(password)
                    if (md5Pasword == result[0].password)
                    {   console.log("email:" +email)
                        const user_info=`SELECT * FROM registered_users  WHERE email = '${email}' LIMIT 1 ;`;
                        con.query(user_info,(err,userInfo) => {
                            console.log(userInfo[0].id)                 
                            const accessToken = sign(
                                {userData: userInfo[0]},
                                "importantsecret"
                              );
                              res.json({token:accessToken,userData:userInfo[0]});
                        })
                    }             
                    else
                        res.json({ error: 'wrong password' })

                })
            }
        }
    })
})
router.get("/verifyToken", validateToken, (req, res) => {
    
    res.json(req.user);
    // console.log(req.user)
  });
  

module.exports = router;