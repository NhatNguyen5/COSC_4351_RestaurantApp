const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const pool = require("./db");
const { check, validationResult } = require("express-validator");
var table_cal = require("./table_calculations");
var Holidays = require("date-holidays");
const { time } = require("console");
const { query } = require("express");
var hd = new Holidays("US");

//middleware
app.use(cors());
app.use(express.json()); //req.body

let urlencoded = express.urlencoded({ extended: true });
app.use(express.json());
app.use(urlencoded);
app.use(express.static(__dirname + "/"));

app.get("/checkHoliday/:fac", async (req, res) => {
  const { fac } = req.params;
  var date = fac.split(",")[0];
  var timeZone = fac.split(",")[1];
  hd.isHoliday(fac);
  console.log(fac);
  var temp = new Date(`${date} 00:00:00 ${timeZone}`);
  console.log(hd.isHoliday(temp));
  res.json(hd.isHoliday(temp));
});

app.post("/register", async (req, res) => {
  userid = req.body.userid;
  user = req.body.user;
  pass = req.body.pass;
  fullname = req.body.fullname;
  phone = req.body.phone;
  email = req.body.email;
  mailaddress = req.body.mailaddress;
  billaddress = req.body.billaddress;
  point = req.body.point;
  preferpayment = req.body.preferpayment;
  try {
    console.log(req.body);
    //this will encrypt the password once it is made
    console.log(`INSERT INTO userInfo VALUES('${userid}','${fullname}','${phone}','
      ${email}','${mailaddress}','${billaddress}','${point}');`);
    const Todo = await pool.query(
      `INSERT INTO userCredentials VALUES(${userid},'${user}',crypt('${pass}',gen_salt('bf')));`
    );
    const newTodo = await pool.query(
      `INSERT INTO userInfo VALUES(${userid},'${fullname}','${phone}','${email}','${mailaddress}','${billaddress}','${point}');`
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/reserveTable", async (req, res) => {
  ResID = req.body.ResID;
  fistName = req.body.fistName;
  lastName = req.body.lastName;
  email = req.body.email;
  phone = req.body.phone;
  resDate = req.body.resDate;
  resTime = req.body.resTime;
  noOfSeats = req.body.noOfSeats;
  tablePicked = req.body.tablePicked;
  prefPay = req.body.prefPay;
  isHoliday = req.body.isHoliday;
  userID = req.body.userID;
  try {
    console.log(req.body);
    //this will encrypt the password once it is made
    console.log(`INSERT INTO Reservation VALUES(${ResID},'${fistName}','${lastName}','${phone}',
                                                    '${email}','${resDate}','${resTime}:00',${noOfSeats},
                                                    '${tablePicked}','${prefPay}', '${isHoliday}', '${userID}');`);
    const newTodo = await pool.query(
      `INSERT INTO Reservation VALUES(${ResID},'${fistName}','${lastName}','${phone}',
                                          '${email}','${resDate}','${resTime}:00',${noOfSeats},
                                          '${tablePicked}','${prefPay}','${isHoliday}','${userID}');`
    );
    res.json(newTodo.rows);
  } catch (err) {
    //alert(err);
    console.error(err.message);
  }
});

app.post("/cancelRes", async (req, res) => {
  resID = req.body.resID;
  emailID = req.body.emailID;
  try {
    console.log(req.body);
    console.log(
      `DELETE FROM reservation WHERE reservation.reservationID = '${resID}' AND reservation.email = '${emailID}'`
    );
    const cancel = await pool.query(
      `DELETE FROM reservation WHERE reservation.reservationID = '${resID}' AND reservation.email = '${emailID}'; `
    );
    res.json(cancel.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/cancelUserRes", async (req, res) => {
  resID = req.body.resID;
  try {
    console.log(req.body);
    console.log(
      `DELETE FROM reservation WHERE reservation.reservationID = '${resID}'`
    );
    const cancel = await pool.query(
      `DELETE FROM reservation WHERE reservation.reservationID = '${resID}'; `
    );
    res.json(cancel.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/login/:fac", async (req, res) => {
  const { fac } = req.params;
  var user = fac.split(",")[0];
  var pass = fac.split(",")[1];
  try {
    console.log(req.body);
    //find if login info is correct
    const newTodo = await pool.query(
      `select count(userid) from usercredentials where loginid = '${user}' and password = crypt('${pass}',password); `
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/uid", async (req, res) => {
  try {
    console.log(req.body);
    //search for latest userID
    const newTodo = await pool.query(
      `SELECT userid from userInfo ORDER BY userid DESC LIMIT 1;`
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/checkEmail/:emailData", async (req, res) => {
  const { emailData } = req.params;
  var resID = emailData.split(",")[0];
  var emailID = emailData.split(",")[1];
  try {
    console.log(req.body);
    console.log(
      `select * from reservation where reservationID = '${resID}' and email = '${emailID}';`
    );
    //search for latest userID
    const newTodo = await pool.query(
      `select * from reservation where reservationID = '${resID}' and email = '${emailID}';`
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/searchResID/:fac", async (req, res) => {
  const { fac } = req.params;
  var resID = fac.split(",")[0];
  var userID = fac.split(",")[1];
  var query_line = "";
  if (userID != "-1") {
    query_line = `select * from reservation where userID = '${userID}';`;
  } else {
    query_line = `select * from reservation where reservationID = '${resID}' and userID = '1';`;
  }
  try {
    console.log(req.body);
    console.log(query_line);
    //search for latest userID
    const newTodo = await pool.query(query_line);
    if (userID == "-1") {
      {
        delete newTodo.rows[0]["email"];
        delete newTodo.rows[0]["phone"];
      }
    }
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/resid", async (req, res) => {
  try {
    console.log(
      `SELECT reservationid from Reservation order by reservationid desc limit 1;`
    );
    //search for latest userID
    const newTodo = await pool.query(
      `SELECT reservationid from Reservation order by reservationid desc limit 1;`
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/uid1/:fac", async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body);
    //search for latest userID
    console.log(
      `select userid from usercredentials where loginid = '${fac}' order by userid desc limit 1;`
    );
    const newTodo = await pool.query(
      `select userid from usercredentials where loginid = '${fac}' order by userid desc limit 1;`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/uid2/:fac", async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body);
    console.log(
      `
      select * from userInfo where userID = ${fac};
      `
    );
    const newTodo = await pool.query(
      `
      select * from userInfo where userID = ${fac};
      `
    );
    //console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getTables/:fac", async (req, res) => {
  const { fac } = req.params;

  const date = req.params.fac.split(",")[0];
  const time = req.params.fac.split(",")[1] + ":00";
  console.log(date + " " + time);
  console.log(
    `select reservation.tablepicked from reservation
  where reservation.reservationdate = '${date}' and reservation.reservationtime = '${time}'`
  );
  try {
    const reservedTableList = await pool.query(`
    select reservation.tablepicked from reservation
    where reservation.reservationdate = '${date}' and reservation.reservationtime = '${time}'`);
    console.log(reservedTableList.rows);
    res.json(reservedTableList.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/updateProfile", async (req, res) => {
  userid = req.body.userID;
  phone = req.body.phone;
  email = req.body.email;
  mailaddress = req.body.mailaddress;
  billaddress = req.body.billaddress;
  try {
    console.log(req.body);
    console.log(
      `UPDATE userInfo SET phone = '${phone}', email = '${email}', mailAddress = '${mailaddress}', billAddress = '${billaddress}' WHERE userID = ${userid}`
    );
    const Todo = await pool.query(
      `UPDATE userInfo SET phone = '${phone}', email = '${email}', mailAddress = '${mailaddress}', billAddress = '${billaddress}' WHERE userID = ${userid}`
    );
    res.json(Todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//ROUTES//
app.post("/profile", async (req, res) => {
  userid = req.body.userid;
  fullname = req.body.name;
  address = req.body.add;
  address2 = req.body.add2;
  city = req.body.city;
  state = req.body.state;
  zipcode = req.body.zip;
  console.log("work?");
  try {
    console.log(req.body);
    console.log(
      `INSERT INTO ClientInformation VALUES(${userid},'${fullname}','${address}','${address2}','${city}','${state}','${zipcode}'); `
    );
    const newTodo = await pool.query(
      `INSERT INTO ClientInformation VALUES(${userid},'${fullname}','${address}','${address2}','${city}','${state}','${zipcode}'); `
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

console.log(table_cal());
