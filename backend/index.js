const express = require("express");
const path = require('path');
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const cors = require("cors");
const creds = require('../config/config');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log("We are live on port " + port);
});

app.get("/", (req, res, next) => {
  res.send("Welcome to my api");
});

var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
};

var transporter = nodeMailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

app.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var question = req.body.question;

  var content =
    "Name: " + name + "\n Email: " + email + "\n Question: " + question;

  var mail = {
    from: name,
    to: "lawyerless123@gmail.com",
    subject: "Question from " + email,
    text: content
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});
