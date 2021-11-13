const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const pool = require("./db");
const { check, validationResult } = require('express-validator');
var table_cal = require("./table_calculations");
var Holidays = require('date-holidays');
const { time } = require("console");
var hd = new Holidays('US');

//middleware
app.use(cors());
app.use(express.json()); //req.body

let urlencoded = express.urlencoded({ extended: true })
app.use(express.json());
app.use(urlencoded);
app.use(express.static(__dirname + '/'));

app.get('/checkHoliday/:fac', async (req, res) => {
  const { fac } = req.params;
  var date = fac.split(',')[0];
  var timeZone = fac.split(',')[1];
  hd.isHoliday(fac);
  console.log(fac);
  var temp = new Date(`${date} 00:00:00 ${timeZone}`);
  console.log(hd.isHoliday(temp));
  res.json(hd.isHoliday(temp));
});

//Du Code
app.post("/register", async (req, res) => {
  userid = req.body.userid;
  user = req.body.user;
  pass = req.body.pass;
  try {
    console.log(req.body)
    //this will encrypt the password once it is made
    const newTodo = await pool.query(
      `INSERT INTO UserCredentials VALUES(${userid},'${user}',crypt('${pass}',gen_salt('bf'))); `
    );
    res.json(newTodo.rows);

  } catch (err) {
    alert(err);
    console.error(err.message);
  }
});

app.post("/reserveGuestTable", async (req, res) => {
  gResID = req.body.gResID;
  fistName = req.body.fistName;
  lastName = req.body.lastName;
  email = req.body.email;
  phone = req.body.phone;
  resDate = req.body.resDate;
  resTime = req.body.resTime;
  noOfSeats = req.body.noOfSeats;
  tablePicked = req.body.tablePicked;
  prefPay = req.body.prefPay;
  try {
    console.log(req.body)
    //this will encrypt the password once it is made
    console.log(`INSERT INTO guestReservation VALUES(${gResID},'${fistName}','${lastName}','${phone}',
                                                    '${email}','${resDate}','${resTime}:00',${noOfSeats},
                                                    '${tablePicked}','${prefPay}');`)
    const newTodo = await pool.query(
      `INSERT INTO guestReservation VALUES(${gResID},'${fistName}','${lastName}','${phone}',
                                          '${email}','${resDate}','${resTime}:00',${noOfSeats},
                                          '${tablePicked}','${prefPay}');`
    );
    res.json(newTodo.rows);

  } catch (err) {
    //alert(err);
    console.error(err.message);
  }
});

app.get('/login/:fac', async (req, res) => {
  const { fac } = req.params;
  var user = fac.split(',')[0];
  var pass = fac.split(',')[1];
  try {
    console.log(req.body)
    //find if login info is correct
    const newTodo = await pool.query(
      `select count(userid) from usercredentials where loginid = '${user}' and password = crypt('${pass}',password); `
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/uid', async (req, res) => {

  try {
    console.log(req.body)
    //search for latest userID
    const newTodo = await pool.query(
      `select userid from usercredentials order by userid desc limit 1;`
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/gresid', async (req, res) => {

  try {
    console.log(`SELECT greservationid from guestReservation order by greservationid desc limit 1;`)
    //search for latest userID
    const newTodo = await pool.query(
      `SELECT greservationid from guestReservation order by greservationid desc limit 1;`
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/uid1/:fac', async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body)
    //search for latest userID
    const newTodo = await pool.query(
      `select userid from usercredentials where loginid = '${fac}' order by userid desc limit 1;`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/orderHist/:fac', async (req, res) => {
  const { fac } = req.params;
  console.log("SELECT * FROM fuelquote where userid = ${fac} ORDER BY orderid");
  try {
    const allOrder = await pool.query(`SELECT * FROM fuelquote WHERE userid = ${fac} ORDER BY orderid;`);
    console.log(allOrder.rows);
    res.json(allOrder.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/getTables/:fac', async (req, res) => {
  const { fac } = req.params

  const date = req.params.fac.split(",")[0];
  const time = req.params.fac.split(",")[1] + ':00';
  console.log(date + " " + time);
  console.log(
  `select reservation.tablepicked from reservation
  where reservation.reservationdate = '${date}' and reservation.reservationtime = '${time}'
  union
  select guestreservation.tablepicked from guestreservation
  where guestreservation.reservationdate = '${date}' and guestreservation.reservationtime = '${time}'`
  );
  try {
    const reservedTableList = await pool.query(`
    select reservation.tablepicked from reservation
    where reservation.reservationdate = '${date}' and reservation.reservationtime = '${time}'
    union
    select guestreservation.tablepicked from guestreservation
    where guestreservation.reservationdate = '${date}' and guestreservation.reservationtime = '${time}'
    `);
    console.log(reservedTableList.rows);
    res.json(reservedTableList.rows)
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/findadd/:fac', async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body)
    //search for latest userID
    const newTodo = await pool.query(
      `select address from clientinformation where userid = '${fac}' order by address desc limit 1;`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/findgal/:fac', async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body)
    //search gallon
    const newTodo = await pool.query(
      `select count(gallonsreq) from fuelquote where userid = ${fac};`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/findstate/:fac', async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body)
    //search state
    const newTodo = await pool.query(
      `select state from clientinformation where userid = ${fac} limit 1;`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/oid/:fac', async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body)
    //search for latest orderid
    const newTodo = await pool.query(
      `select orderid from fuelquote where userid = ${fac} order by orderid desc limit 1;`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/checkProfile/:fac', async (req, res) => {
  const { fac } = req.params;
  try {
    console.log(req.body)
    const newTodo = await pool.query(
      `select count(*) from clientinformation where userid = ${fac};`
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//William Code
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/fuelform.html'))
})

app.post('/formData', [
  check('gallonsreq')
    .not().isEmpty().withMessage('Name cannot be empty.')
    .isLength({
      max: 50
    }).withMessage('50 numbers max for gallons required.')
    .trim(),

  check('deliveryadr')
    .not().isEmpty().withMessage('Delivery address cannot be empty.')
    .isLength({
      max: 100
    }).withMessage('100 characters max for address.'),

  check('ddate')
    .not().isEmpty().withMessage('Delivery date cannot be empty.'),

], (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  response.status(202).json({
    success: 'Ok'
  })
});

app.post("/fuelform", async (req, res) => {
  userid = req.body.userid;
  orderid = req.body.orderid;
  gallonsrequested = req.body.gallonsreq;
  deliveryaddress = req.body.deliveryadr;
  deliverydate = req.body.ddate;
  sug = req.body.suggested;
  total = req.body.total;
  console.log("work?");
  try {
    console.log(req.body)
    console.log(`INSERT INTO FuelQuote VALUES(${userid},${orderid},${gallonsrequested},'${deliveryaddress}','${deliverydate}',${sug},${total}); `)
    const newTodo = await pool.query(
      `INSERT INTO FuelQuote VALUES(${userid},${orderid},${gallonsrequested},'${deliveryaddress}','${deliverydate}',${sug},${total}); `
    );
    res.json(newTodo.rows);

  } catch (err) {
    console.error(err.message);
  }
});


//Duy Code
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/profile_dv.html'))
});

app.post('/formData', [
  check('fullname')
    .not().isEmpty().withMessage('Name cannot be empty.')
    .isLength({
      max: 50
    }).withMessage('50 characters max for full name.')
    .trim(),

  check('address')
    .not().isEmpty().withMessage('Address cannot be empty.')
    .isLength({
      max: 100
    }).withMessage('100 characters max for address.'),

  check('address2')
    .isLength({
      max: 100
    }).withMessage('100 characters max for address 2.'),

  check('city')
    .not().isEmpty().withMessage('City cannot be empty.')
    .isLength({
      max: 100
    }).withMessage('100 characters max for city.'),

  check('zipcode')
    .isPostalCode('US').withMessage('not a valid US Zipcode.')
    .isLength({
      min: 5,
      max: 9
    }).withMessage('Minimum of 5 characters and Maximum of 9 characters for Zipcode.')
], (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  response.status(202).json({
    success: 'Ok'
  })
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
    console.log(req.body)
    console.log(`INSERT INTO ClientInformation VALUES(${userid},'${fullname}','${address}','${address2}','${city}','${state}','${zipcode}'); `)
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