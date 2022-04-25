const express = require("express");
// import packages
const mysql = require("mysql");
const app = express();
const http = require("http").Server(app);
const bodyparser = require("body-parser");
var geoip = require("geoip-lite");
const multer = require("multer");
var cors = require("cors");
var md5 = require("md5");
const requestIp = require("request-ip");
var geoip = require("geoip-lite");
// middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
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
// images uploads
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});
app.post("/imageupload", async (req, res) => {
  console.log(req);
  try {
    // 'avatar' is the name of our file input field in the HTML form

    let upload = multer({ storage: storage }).single("avatar");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields

      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
      var sql = `UPDATE registered_users SET image = '${req.file.filename}' WHERE id = '${req.body.UID}'`;

      con.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ success: 1 });
      });
    });
  } catch (err) {
    console.log(err);
  }
});
// images upload end
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
const ServedBy = (chat_id, agent_id, agent_name) => {
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
  con.query(
    `SELECT * FROM registered_users  WHERE email = ?;`,
    [email],
    function (err, result) {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          res.send("email already exists");
        } else {
          const sql = `INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES ('${fname}', '${lname}', '${email}', '${md5Pasword}','${company}')`;
          // var sql = "INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES ?)";
          con.query(
            `INSERT INTO registered_users (f_name, l_name,email,password,c_name) VALUES (?, ?, ?, ?,?)`,
            [fname, lname, email, md5Pasword, company],
            function (err, result) {
              if (err) {
                throw err;
                //   console.log('err block')
              } else {
                res.send({
                  message: "Account Created Successfully",
                  success: 1,
                });
              }
            }
          );
        }
      }
    }
  );
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
// UPDATE USER AHAD
app.post("/updateuser", (req, res) => {
  const query = `UPDATE registered_users SET f_name='${req.body.firstname}', l_name='${req.body.lastname}', email='${req.body.email}' WHERE id = '${req.body.id}' `;
  con.query(
    `UPDATE registered_users SET f_name=?, l_name=?, email=? WHERE id = ? `,
    [req.body.firstname, req.body.lastname, req.body.email, req.body.id],
    (err, result) => {
      if (err) throw err;
      res.json("1");
    }
  );
});
// UPDATE USER END AHAD
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

const incrementMessageCount = (id) => {
  con.query(
    `UPDATE all_chats SET count = count+1 WHERE customer_id = ? `,
    [id],
    function (error, result) {
      console.log(result);
    }
  );
};

// GET LEADS END - BY AHAD
// Get All messages from the database for a given socket id

app.post("/chats/messages", (req, res) => {
  console.log("requested messages id:" + req.body.id);
  const query = `SELECT * from all_messages WHERE sender = '${req.body.id}' `;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log(result[0]);
    res.json(result);
  });
});
app.post("/chats/addmessage", (req, res) => {
  const message = req.body.message;
  const id = req.body.id;
  insertMessage(message, id, "Agent");
  res.json("Message ade=d successfully");

  incrementMessageCount(id);
});
app.post("/chats/servedby", (req, res) => {
  const chatID = req.body.chatID;
  const agentID = req.body.agentID;
  const agent_name = req.body.agentName;
  ServedBy(chatID, agentID, agent_name);
  res.json("served by");
});

// OWNER GET USER LIST AHAD
app.post("/userslist", (req, res) => {
  const usersListOwner = [];
  const role = req.body.role;
  const userslist =
    role == "all"
      ? `SELECT * FROM registered_users`
      : `SELECT * FROM registered_users WHERE account_type = '${role}'`;
  con.query(userslist, (err, result) => {
    return Promise.all(
      result.map((element) => {
        usersListOwner.push(result);
      })
    ).then(() => res.json(result));
  });
});
// OWNER GET USER LIST END
// OWNER DELETE USER LIST AHAD
app.post("/deleteuser", (req, res) => {
  const id = req.body.user_id;
  const deleteuser = `DELETE FROM registered_users WHERE id='${id}}'`;
  con.query(deleteuser, (err, result) => {
    res.json(result);
    console.log(err);
  });
});
// OWNER DELETE USER LIST END
// api for get chat record for a given ID
app.post("/chats/chat", (req, res) => {
  console.log("chats:" + req.body.id);
  const ID = req.body.id;
  console.log("chat id requested:" + ID);
  const query = `SELECT * FROM all_chats WHERE customer_id = '${ID}'`;
  con.query(query, (error, result) => {
    if (error) throw error;
    console.log(result);
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
  const { customer_name, email, phone, agent, company_url, c_name } = LeadData;
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
  storeLead(LeadData);
});

// api to get all chats from database
app.get("/chats/getallchats", (req, res) => {
  const query = `SELECT * from all_chats`;
  con.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
// code for socket io
let agents = [];
const chatEnd = (id) => {
  console.log("*****************");
  console.log(id);
  console.log("*****************");
  const query = `UPDATE all_chats SET is_end = '1' WHERE customer_id = '${id}' `;
  con.query(query, (error, result) => {
    if (error) throw error;
    // console.log(result)
  });
};
io.on("connection", (socket) => {
  const origin = socket.handshake.headers.origin;
  const address = socket.handshake.address;

  // const sql = `INSERT INTO visitors (visited_url,address) VALUES ('${origin}', '${address}')`;

  // con.query(sql, function (err, result) {
  //   if (err) {
  //     throw err;
  //     //   console.log('err block')
  //   } else {
  //     console.log('added')
  //   }
  // });

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
    console.log("data room joined" + data);
    io.to(data.id).emit("room joined", data);
  });
  socket.on("client join room", (data) => {
    console.log("client room joined in server");
    console.log("data.id: " + data.id);
    socket.join(data.id);
    // io.to(data.id).emit("room joined", data);
  });
  socket.on("new message", (msg, id) => {
    console.log("new message id:" + id);
    insertMessage(msg, id);
    console.log("emitting ");
    incrementMessageCount(id);
    console.log("socket id: " + socket.id);
    io.to(id).emit("NEW MESSAGE", msg);
  });
  socket.on("leave room", (data) => {
    console.log("leaving");
    socket.leave(data);
    console.log(data);
    chatEnd(data);
    io.to(data).emit("LEAVE ROOM");
  });
  socket.on("NEW_MESSAGE", (data) => {
    console.log("new message from agent to server");
    io.to(data.id).emit("new Message", data);
  });
  socket.on("disconnect", (reason) => {
    console.log("reason :" + reason);
    console.log("disconnected");
    if (reason == "client namespace disconnect") {
      console.log("disconnected id:" + socket.id);
      unAnswered(socket.id);
      // endChat()
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
