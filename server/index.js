const express = require("express");
// import packages
const mysql = require("mysql");
const app = express();
const http = require("http").Server(app);
const bodyparser = require("body-parser");
var cors = require("cors");
var md5 = require("md5");
const requestIp = require('request-ip');
var geoip = require('geoip-lite');


// middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
});




// import routes
const signInRouter = require("./routes/signin");
const { get } = require("./routes/signin");

// constant and variables
const port = 3001;

// create connection to database####
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chat-service",
});
// get all agents from the database
const getAgents = () => {

  const agents = `SELECT * FROM registered_users  WHERE account_type = 'agent';`;
  con.query(agents, (err, agentsResult) => {
    if (err) throw error;
    else {
      console.log(agentsResult)
    }
  })

}


// get form data from frontend
// ( get from sign Up form)

const usersArray = [];
const agentsArray = [];

// function to add active chat to database
const insertChat = (id) => {
  const chat_query = `INSERT INTO all_chats (customer_id) VALUES ('${id}')`;
  con.query(chat_query, (error, result) => {
    if (error) throw error;
    console.log('inserted')
  })
}
// function to remove chat from active chat from database
const deleteChat = (id) => {
  const deleteChatQuery = `DELETE FROM all_chats  WHERE customer_id = '${id}';`
  con.query(deleteChatQuery, (error, result) => {
    console.log('removed')
  })
}
// function to add message to all messages table
const insertMessage = (message, id) => {
  const query = `INSERT INTO all_messages (message,sender) VALUES ('${message}', '${id}') `;

  con.query(query, (error, result) => {
    if (error) throw error;
    console.log('message inserted')
  })
}

// function to  retrun all active chats


app.post("/signup", (req, res) => {
  console.log("form received");

  const { fname, lname, email, password, company } = req.body;
  let md5Pasword = md5(password);
  // check if email exists
  const search = `SELECT * FROM registered_users  WHERE email = '${email}';`;
  con.query(search, function (err, result) {
    if (err) {
      throw err;

    } else {
      if (result.length > 0) {
        res.send("email already exists");
      } else {
        const sql = `INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES ('${fname}', '${lname}', '${email}', '${md5Pasword}','${company}')`;
        // var sql = "INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES ?)";
        con.query(sql, function (err, result) {
          if (err) {
            throw err;
            //   console.log('err block')
          } else {
            res.send("Account Created Successfully");
          }
        });
      }
    }
  });
});
app.use("/signin", signInRouter);
// APIs for chats Messages
app.get('/chats/active', (req,res)=>{
  const query=`SELECT * FROM all_chats WHERE status = '0'`
  con.query(query,(error,result)=>{
    if(error) throw error;
    res.json(result)
  })
 
})
// code for socket io
let agents = []
io.on("connection", (socket) => {
  socket.on('agent active', () => {
    agents.indexOf(socket.id) === -1 ? agents.push(socket.id) : null;
  })
  // First Message From Customer
  socket.on('first message', (data) => {
    insertChat(data.id)
    insertMessage(data.msg, data.id)
    agents.map(agent => {
      socket.to(agent).emit('NEW USER', { id: data.id, msg: data.msg, ip: '::1' })
    })
  })
  socket.on('continued message', (msg) => {
    console.log(' continued message')
    socket.broadcast.emit('CONTINUED MESSAGE', msg)
  })
  socket.on('join room', (data) => {
    socket.join(data.id)
    io.to(data.id).emit('room joined', data)
  })
  socket.on('new message', (msg) => {

    insertMessage(msg, socket.id)
    io.to(socket.id).emit('NEW MESSAGE', msg)
  })
  socket.on('NEW_MESSAGE', data => {
    console.log('new message from agent to server')
    io.to(data.id).emit('new Message', data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
    // socket.disconnect()
    deleteChat(socket.id)
    // socket.emit('disconnect',('customer ended this chat'))

  })
});

//   listen on port
http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = con;
