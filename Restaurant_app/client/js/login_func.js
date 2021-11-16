var uid = findLastUID();

async function reserveInfo()
{
    location.href = "reserve_info.html";
}

async function insertUserCred() {
const result = await findUID()
if (uid == null) {
    uid = 0;
}
var user = document.querySelector("#r_user").value;
var pass = document.querySelector("#r_pass").value;
var firstN = document.querySelector("#nameF").value;
var lastN = document.querySelector("#nameL").value;
var mailA = document.querySelector("#mailA").value;
var billA = document.querySelector("#billA").value;
var mailE = document.querySelector("#mailE").value;
var numP = document.querySelector("#numP").value;
var userid = uid;
try {
    const body = {
    userid: userid,
    user: user,
    pass: pass,
    fullname: firstN + " " + lastN,
    phone: numP,
    email: mailE,
    mailaddress: mailA,
    billaddress: billA,
    point: 0,
    preferpayment: "Valid CreditCard",
    };
    const response = await fetch(`http://localhost:5000/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    });
    alert("Registration Successful!");
    window.location.href = "rest_login.html";
} catch (err) {
    console.log(err.message);
}
}
async function findLastUID() {
try {
    const response = await fetch(`http://localhost:5000/uid`);
    const jsonData = await response.json();
    let data = [];
    data = jsonData;
    if (data.length == 0 || data.length == null) {
    uid = 0;
    } else {
    uid = data[0].userid + 1;
    }
} catch (err) {
    console.log(err.message);
}
}
async function success_login(){
    var l_user = document.querySelector('#l_user').value;
    var l_pass = document.querySelector('#l_pass').value;
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
            window.location.href = 'profile_page.html';
        }
        else{
            alert("Incorrect Username or Password");
        }
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
        localStorage.setItem("userID", data[0].userid);
    }catch (err) {
    console.log(err.message);
    }
}

function copyMailing(){
    document.getElementById('billA').value = document.getElementById('mailA').value;
}

