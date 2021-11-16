var fname;
var lname;
var phone;
var email;
var mailA;
var billA;
var points;

window.onload = getUserInfo();

async function getUserInfo() {
    var fac = localStorage.getItem("userID");
    console.log(fac);
    try {
        const response = await fetch(`http://localhost:5000/uid2/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        parseInfo(data);
        console.log(data);
    } catch (err) {
        console.log(err.message);
    }
}

function parseInfo(data) {
    let fullname = (data[0].fullname).split(" ")
    fname = fullname[0]
    lname = fullname[1]
    document.getElementById("welcome").innerHTML = `Welcome ${fname} ${lname}!`
    phone = data[0].phone
    document.getElementById("PhoneNum").value = phone
    email = data[0].email
    document.getElementById("EmailAdd").value = email
    points = data[0].points
    document.getElementById("points").innerHTML = `${points}`
    billA = data[0].billaddress
    document.getElementById("billAdd").value = `${billA}`
    mailA = data[0].mailaddress
    document.getElementById("mailAdd").value = `${mailA}`
    console.log(billA, mailA);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
}

async function reserveInfo()
{
    location.href = "reserve_info.html";
}