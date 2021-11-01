//current userid
var uid = findLastUID();
var curUID = 0;

//current oderid
var oid = 0;

var hist = []
//current address
var curAdd = '';

//calc
var curState = '';
var oldGal = 0;
var gal = 0;
var sug = 0;
var tot = 0;

//fetch user/pass to make sure it's in db, if it is, save curuid
async function success_login(){
    var l_user = document.querySelector('#l_user').value;
    var l_pass = document.querySelector('#l_pass').value;
    cur_user = l_user;
    console.log(l_user);
    var fac = l_user + ',' + l_pass;

    if(l_user.length == 0 || l_pass.length == 0){
        alert("Please fill all required field.");
        return false;
    }
    try {
        const response = await fetch(`http://localhost:5000/login/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        if(data[0].count == 1)
        {
            const result = await findUID(l_user);
            window.location.href = 'transition.html';
        }
        else{
            alert("Incorrect Username or Password");
        }
    }catch (err) {
      console.log(err.message);
    }
}

async function reserveTable()
{
    location.href = "reserve_table.html";
}

async function insertUserCred() {
    // const result = await findUID()
    if(uid == null){
        uid = 0;
    }
    var user = document.querySelector('#r_user').value;
    var pass = document.querySelector('#r_pass').value;
    var userid = uid;
    try{
        const body = {
            userid: userid,
            user: user, 
            pass: pass 
        };
        const response = await fetch(`http://localhost:5000/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        alert("Registration Successful!");
        window.location.href = 'login.html';
    }catch (err) {
        console.log(err.message);
    }
}

async function findLastUID(){
    try {
        const response = await fetch(`http://localhost:5000/uid`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        if(data.length == 0 || data.length == null){
            uid = 0;
        }
        else{
            uid = data[0].userid + 1;
        }
  
    }catch (err) {
      console.log(err.message);
    }
}

async function findLastOID(){
    var fac = localStorage.curUID;
    try {
        const response = await fetch(`http://localhost:5000/oid/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        if(data.length == 0 || data.length == null){
            localStorage.oid = 0;
        }
        else{
            localStorage.oid = data[0].orderid;
        }
        console.log(localStorage.oid);
    }catch (err) {
      console.log(err.message);
    }
}



async function findUID(l_user){
    var fac = l_user;
    try {
        const response = await fetch(`http://localhost:5000/uid1/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        console.log(data[0].userid);
        localStorage.curUID = data[0].userid;
    }catch (err) {
      console.log(err.message);
    }
}


async function selectHistory() {
    var fac = localStorage.curUID;
    console.log(fac);
    try {
      const response = await fetch(`http://localhost:5000/orderHist/${fac}`);
      const jsonData = await response.json();
      setHist(jsonData);
      console.log(jsonData);
      displayHist();
    } catch (err) {
      console.log(err.message);
    }
}

async function findAdd() {
    var fac = localStorage.curUID;
    console.log(fac);
    try {
      const response = await fetch(`http://localhost:5000/findadd/${fac}`);
      const jsonData = await response.json();
        const data = jsonData;
        localStorage.curAdd = data[0].address;
        console.log(localStorage.curAdd);
        displayAdd();

    } catch (err) {
      console.log(err.message);
    }

}

async function findGal() {
    var fac = localStorage.curUID;
    try {
      const response = await fetch(`http://localhost:5000/findgal/${fac}`);
      const jsonData = await response.json();
        const data = jsonData;
        localStorage.oldGal = data[0].count;
        console.log(localStorage.oldGal);

    } catch (err) {
      console.log(err.message);
    }

}

async function findState() {
    var fac = localStorage.curUID;
    try {
      const response = await fetch(`http://localhost:5000/findState/${fac}`);
      const jsonData = await response.json();
        const data = jsonData;
        localStorage.curState = data[0].state;
        console.log(localStorage.curState);

    } catch (err) {
      console.log(err.message);
    }

}

const displayAdd = () => {
    document.getElementById('deliveryadr').value = localStorage.curAdd;
}

const setHist = (data) => {
    hist = data;
}

if (document.URL.includes("orderhistory.html")) {
    selectHistory();
}

if (document.URL.includes("fuelform.html")) {
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#ddate").value = document.querySelector("#ddate").min = today;
    findAdd();
    findGal();
}

if(document.URL.includes("transition.html")){
    findState();
    findLastOID();
}

async function checkProfile(){
    var fac = localStorage.curUID;
    try {
        const response = await fetch(`http://localhost:5000/checkProfile/${fac}`);
        const jsonData = await response.json();
        const data = jsonData;
        if(data[0].count > 0){
            alert("Sorry you already have a profile!");
        }
        else{
            const result = await insertProf();
        }
    }catch (err) {
        console.log(err.message);
    }
}

function change(){
    let ticket = document.getElementById('gallonsreq').value;
    if(ticket > 0){
        var locationFac = 0.04;
        var historyFac = 0.01;
        var gallonsreqFac = 0.03;
        var profitFac = 0.1;
        var currentPrice = 1.50;
        var state = localStorage.curState;
        var oldGallons = localStorage.oldGal;
        console.log(state.length);
        if(state.substr(0,5) == 'Texas'){
            console.log("Yes texas");
            locationFac = 0.02;
        }
        console.log(locationFac);

        if (ticket > 1000){
            gallonsreqFac = 0.02;
        }

        if(oldGallons > 0){
            var margin = currentPrice * (locationFac - historyFac + gallonsreqFac + profitFac);
        }
        else{
            var margin = currentPrice * (locationFac  + gallonsreqFac + profitFac);
        }
        var suggestedPrice = currentPrice + margin;
        var totalAmount = ticket * suggestedPrice;

        document.getElementById("suggestedp").value = suggestedPrice;
        document.getElementById('totalamt').value = totalAmount;
        localStorage.gal = ticket;
        localStorage.sug = suggestedPrice;
        localStorage.tot = totalAmount;
    }
    else{
        alert("CANNOT BE NEGATIVE");
        window.location.href = "transition.html";
    }
}

const displayHist = () => {
    const orderTable = document.querySelector('#order_hist');
  
    let tableHTML = "";
    hist.map(FuelQuote => {
      tableHTML +=
        `<tr key=${FuelQuote.userid}>
        <td >${FuelQuote.orderid}</td>
        <td>${FuelQuote.gallonsreq}</td>
        <td>${FuelQuote.deliveryadd}</td>
        <td>${FuelQuote.deliverydate.substr(0, 10)}</td>
        <td>${FuelQuote.suggestedprice}</td>
        <td>${FuelQuote.total}</td>
        </tr>`;
    })
    orderTable.innerHTML = tableHTML;
}

async function insertfuelF() {

    var ddate = document.getElementById('ddate').value;
    var newoid = localStorage.getItem("oid");
    var newoid1 = parseInt(newoid) + 1;
    console.log(newoid1);
    try {
    const body = {
        userid: localStorage.curUID,
        orderid: newoid1,
        gallonsreq: localStorage.gal, 
        deliveryadr: localStorage.curAdd,
        ddate: ddate,
        suggested: localStorage.sug,
        total: localStorage.tot 
    };

    const response = await fetch(`http://localhost:5000/fuelform`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
  
    alert('Success!');
    window.location.href = 'transition.html';
  
    }catch (err) {
      console.log(err.message);
    }
}




async function insertProf() {
    var userid = localStorage.curUID;
    var name = document.querySelector('#name').value;
    var add = document.querySelector('#add').value;
    if(document.querySelector('#add2').value == ""){
        var add2 = "null";
    }
    else{
        var add2 = document.querySelector('#add2').value;
    }
    var city = document.querySelector('#city').value;
    var state = document.querySelector('#state').value;
    var zip = document.querySelector('#zip').value;
    if(name.length == 0 || name.length > 50
        || add.length == 0 || add.length > 100
        || city.length == 0 || city.length > 100
        || zip.length < 5 || zip.length > 9){
        alert("Please fill all required field.");
        return false;
    }
    console.log(name);
    try {
    const body = {
        userid: userid,
        name: name, 
        add: add,
        add2: add2,
        city: city,
        state: state,
        zip: zip
    };
    const response = await fetch(`http://localhost:5000/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    alert("Profile Created!");
    window.location.href = 'transition.html'
    }catch (err) {
      console.log(err.message);
    }
}

function checkGallonReq(num){
    curUID = num;
    uid = curUID;
    if(uid > 0){
        return true;
    }
    else{
        return false;
    }
}

function testLogin(user,pass){
    return `${user} and ${pass}`;
}

function validateUser(user){
    if(user.length < 4 || user.length > 20){
        return false;
    }
    else{
        return true;
    }
}

function checkPwd(str) {
    if (str.length < 6) {
        return("too_short");
    } else if (str.length > 50) {
        return("too_long");
    } else if (str.search(/\d/) == -1) {
        return("no_num");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        return("no_letter");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        return("bad_char");
    }
    return("ok");
}

function checkName(name) {
    if (name.length == 0) {
        return("no_name");
    } 
    else if (name.length > 50) {
        return("too_long");
    } 
    return("ok");
}

function checkAddress1(address1){
    curAdd = address1;
    if (curAdd.length == 0) {
        return("no_address1");
    } 
    else if (curAdd.length > 100) {
        return("too_long");
    } 
    return("ok");
}

function checkAddress2(address2){
    if (address2.length == 0) {
        return("no_address2");
    } 
    else if (address2.length > 100) {
        return("too_long");
    } 
    return("ok");
}

function checkCity(city){
    if (city.length == 0) {
        return("no_city");
    } 
    else if (city.length > 100) {
        return("too_long");
    } 
    return("ok");
}

function checkZipcode(zipcode){
    if (zipcode.length < 5) {
        return("too_short");
    } 
    else if (zipcode.length > 9) {
        return("too_long");
    } 
    return("ok");
}

function checkGalreq(gallonsreq) {
    if (gallonsreq.length == 0) {
        return("no_request");
    }
    else if (gallonsreq.length > 50) {
        return("too_long");
    }
    return("ok");
}

function checkDate(ddate){
  if ((ddate.length == 0) || ddate == null){
    return("no_date");
  }
  return("ok");
}

function validateDate(ddate){
  let today = new Date();
  if((ddate - today)<0){
    return false;
  }
  else{
    return true;
  }
}

/*
module.exports.checkGallonReq = checkGallonReq;
module.exports.checkPwd = checkPwd;
module.exports.testLogin = testLogin;
module.exports.validateUser = validateUser;

module.exports.checkName = checkName;
module.exports.checkAddress1 = checkAddress1;
module.exports.checkAddress2 = checkAddress2;
module.exports.checkCity = checkCity;
module.exports.checkZipcode = checkZipcode;

module.exports.checkGalreq = checkGalreq;
module.exports.checkDate = checkDate;
module.exports.validateDate = validateDate;
*/