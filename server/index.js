const express = require("express");
// import packages
const mysql = require("mysql");
const app = express();
const http = require("http").Server(app);
const bodyparser = require("body-parser");
var geoip = require("geoip-lite");

var cors = require("cors");
var md5 = require("md5");
const requestIp = require("request-ip");
var geoip = require("geoip-lite");
// middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
// import routes
const signInRouter = require("./routes/signin");
const { get } = require("./routes/signin");
const { json } = require("body-parser");
const { application } = require("express");
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
      console.log(agentsResult);
    }
  });
};
// get form data from frontend
// ( get from sign Up form)
const usersArray = [];
const agentsArray = [];
// function to add agent to chat
const ServedBy = (chat_id, agent_id,agent_name) => {
  const query = `UPDATE all_chats SET served_by = '${agent_id}',agent_name='${agent_name}' WHERE customer_id = '${chat_id}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log("served added");
  });
};
// function to add active chat to database
const insertChat = (id, origin, address, plateform) => {
  ip = "124.109.35.54";

  // var geo = geoip.lookup(address); //for production
  var geo = geoip.lookup(ip); //for development

  const city = geo.city;
  const country = geo.country;
  const chat_query = `INSERT INTO all_chats (customer_id,origin,address,plateform,city,country) VALUES ('${id}','${origin}','${address}','${plateform}','${city}','${country}')`;
  con.query(chat_query, (error, result) => {
    if (error) throw error;
    console.log("inserted");
  });
};
// function to remove chat from active chat from database
const deleteChat = (id) => {
  const deleteChatQuery = `DELETE FROM all_chats  WHERE customer_id = '${id}';`;
  con.query(deleteChatQuery, (error, result) => {
    console.log("removed");
  });
};
// function to add message to all messages table
const insertMessage = (message, id, source = "customer") => {
  const query = `INSERT INTO all_messages (message,sender,source) VALUES ('${message}', '${id}','${source}' )`;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log("message inserted new message");
  });
};
// function to store tha lead in database

// function to change status to 1/unanswered
const unAnswered = (ID) => {
  const query = `UPDATE all_chats SET status = '2' WHERE customer_id = '${ID}' AND status= '0' `;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log("updated to 2");
  });
};
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
// api for unanswered chat
app.get("/chats/unanswered", (req, res) => {
  const query = `SELECT * FROM all_chats WHERE status = '0'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
// api for active chat
app.get("/chats/active", (req, res) => {
  const query = `SELECT * FROM all_chats WHERE status = '1'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
// api for changing status of chat
app.post("/chats/status1", (req, res) => {
  console.log(req.body.id);
  const query = `UPDATE all_chats SET status = '1' WHERE customer_id = '${req.body.id}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.send("updated");
  });
});

// GET LEADS - BY AHAD

async function loadLeads(result) {
  const leadsData = [];
  for (let i = 0; i < result.length; i++) {
    let domain = result[i].domain;
    const getLeads = `SELECT * FROM leads WHERE company_url = '${domain}'`;
    con.query(getLeads, function (err, leadsDetails) {
      leadsData.push(leadsDetails);
    });
  }
}
app.post("/getleads", (req, res) => {
  const c_name = req.body.c_name;
  const leadsData = [];
  const getDomains = `SELECT * FROM leads WHERE c_name='${c_name}'`;
  con.query(getDomains, function (err, result) {
    return Promise.all(
      result.map((element) => {
        leadsData.push(result);
      })
    ).then(() => res.json(result));
  });
});

// GET LEADS END - BY AHAD
// Get All messages from the database for a given socket id

app.post("/chats/messages", (req, res) => {
  const query = `SELECT * from all_messages WHERE sender = '${req.body.id}' `;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
app.post("/chats/addmessage", (req, res) => {
  const message = req.body.message;
  const id = req.body.id;
  insertMessage(message, id, "Agent");
  res.json("Message ade=d successfully");
});
app.post("/chats/servedby", (req, res) => {
  const chatID = req.body.chatID;
  const agentID = req.body.agentID;
  const agent_name = req.body.agentName;
  ServedBy(chatID, agentID,agent_name);
  res.json("served by");
});
// api for get chat record for a given ID
app.post("/chats/chat", (req, res) => {
  console.log('chats:'+ req.body.id)
  const ID = req.body.id;
  const query = `SELECT * FROM all_chats WHERE customer_id = '${ID}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log(result)
    res.json(result);
  });
});
// api for get agent info for a given chat ID
app.post("/chats/agent", (req, res) => {
  const ID = req.body.id;
  console.log(ID);
  const query = `SELECT f_name,l_name FROM registered_users WHERE id = '${ID}' LIMIT 1`;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log(result[0]);
    res.json(result[0]);
  });
});
// api for getting all the comapnies name
app.get("/chats/companies", (req, res) => {
  const query = `SELECT DISTINCT c_name from registered_users`;
  con.query(query, (err, result) => {
    res.json(result);
  });
});
const storeLead = (LeadData) => {
  const {
    customer_name,
    email,
    phone,
    agent,
    company_url,
    c_name,
  } = LeadData;
  const query = `INSERT INTO leads (lead_name,lead_email,lead_phone,agent_name,company_url,c_name) VALUES ('${customer_name}', '${email}','${phone}','${agent}','${company_url}', '${c_name}' )`;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log("Lead Added");
  });
};
// api to store the leads in database
app.post("/chats/addleads", (req, res) => {
  const LeadData = req.body;
  console.log(LeadData);
  storeLead(LeadData)
});
// api to get all chats from database
app.get('/chats/getallchats',(req,res)=>{
const query=`SELECT * from all_chats`
con.query(query,(error,result)=>{
  if(error) throw error;
  res.json(result)

})
})
// code for socket io
let agents = [];
io.on("connection", (socket) => {
  socket.on("agent active", () => {
    agents.indexOf(socket.id) === -1 ? agents.push(socket.id) : null;
  });
  // First Message From Customer
  socket.on("first message", (data) => {
    const origin = socket.handshake.headers.origin;
    const address = socket.handshake.address;
    const plateform = socket.handshake.headers["sec-ch-ua-platform"];
    console.log("sdfsdf");
    insertChat(data.id, origin, address, plateform);
    insertMessage(data.msg, data.id);
    agents.map((agent) => {
      socket
        .to(agent)
        .emit("NEW USER", { id: data.id, msg: data.msg, ip: "::1" });
    });
  });
  socket.on("join room", (data) => {
    console.log("room joined in server");
    console.log("data.id: " + data.id);
    socket.join(data.id);
    io.to(data.id).emit("room joined", data);
  });
  socket.on("new message", (msg) => {
    insertMessage(msg, socket.id);
    console.log("emitting ");
    console.log("socket id: " + socket.id);
    io.to(socket.id).emit("NEW MESSAGE", msg);
  });
  socket.on("NEW_MESSAGE", (data) => {
    console.log("new message from agent to server");
    io.to(data.id).emit("new Message", data);
  });
  socket.on("disconnect", (reason) => {
    console.log("reason :" + reason);
    console.log("disconnected");
    if (reason == "client namespace disconnect") {
      unAnswered(socket.id);
    }
    // socket.disconnect()
    // deleteChat(socket.id)
    // socket.emit('disconnect',('customer ended this chat'))
  });
});
//   listen on port
http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = con;
