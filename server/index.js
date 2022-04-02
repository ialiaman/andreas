const express = require('express')
// import packages
const mysql = require('mysql');
const app = express()
const http = require('http').Server(app);
const bodyparser = require('body-parser')
var cors = require('cors')
var md5 = require('md5');
// middlewares
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
const io = require('socket.io')(http,{
    cors: {
        origin: ["http://localhost", "http://localhost:3000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// import routes
const signInRouter=require('./routes/signin')

// constant and variables
const port = 3001

// create connection to database####
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "chat-service"
});



// get form data from frontend
// ( get from sign Up form)

app.post('/signup', (req, res) => {
    console.log('form received')

    const { fname, lname, email, password, company } = req.body;
    let md5Pasword=md5(password)
    // check if email exists
    const search = `SELECT * FROM registered_users  WHERE email = '${email}';`;
    con.query(search, function (err, result) {
        if (err) {
            throw err
            //   console.log('err block')
        }
        else {
            if (result.length > 0) {
                res.send('email already exists')
            }
            else {
                const sql = `INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES ('${fname}', '${lname}', '${email}', '${md5Pasword}','${company}')`;
                // var sql = "INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES ?)";  
                con.query(sql, function (err, result) {
                    if (err) {
                        throw err
                        //   console.log('err block')
                    }
                    else {
                        
                        res.send('Account Created Successfully')

                    }
                });

            }
        }
    });



}

)
app.use('/signin',signInRouter)



// code for socket io

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        console.log('message received:'+ msg)
      io.emit('chat message', msg);
    });
  });

//   listen on port
http.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = con;