// const { default: swal } = require("sweetalert");

var fname;
var lname;
var phone;
var email;
var mailA;
var billA;
var points;
var userID;
var cur_data = [];

if(document.URL.includes('profile_page.html')){
    getUserInfo()
}
// window.onload = getUserInfo();

async function logOut()
{
    window.location.replace('welcome_page.html');
}

async function getUserInfo() {
    var fac = localStorage.getItem("userID");
    console.log(fac);
    try {
        const response = await fetch(`http://localhost:5000/uid2/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        cur_data = jsonData;
        parseInfo(data);
        console.log(data);
    } catch (err) {
        console.log(err.message);
    }
}

async function parseInfo(data) {
    let fullname = (data[0].fullname).split(" ")
    fname = fullname[0]
    lname = fullname[1]
    document.getElementById("welcome").innerHTML = `Welcome ${fname} ${lname}!`
    userID = data[0].userid
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
    localStorage.setItem("userID", userID);
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("mailA", mailA);
    localStorage.setItem("billA", billA);
}

async function reserveInfo()
{
    location.href = "reserve_info.html";
}

async function toYourRes()
{
    location.href = "user_reservations.html";
}

async function updateProfile(){
    if(checkUnchanged() == true && document.forms.namedItem("register").reportValidity()){
        new_email = document.querySelector("#EmailAdd").value;
        new_phone = document.querySelector("#PhoneNum").value;
        new_mail = document.querySelector("#mailAdd").value;
        new_bill = document.querySelector("#billAdd").value;
        try {
            const body = {
                userID: localStorage.getItem('userID'),
                phone: new_phone,
                email: new_email,
                mailaddress: new_mail,
                billaddress: new_bill,
            };
            const response = await fetch(`http://localhost:5000/updateProfile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // alert("User profile updated!");
            swal("User profile updated!","","success", {
                buttons: {
                    yes: "Confirm"
                },
                closeOnClickOutside: false
            }).then((value) => {
                switch (value) {          
                    case "yes":
                        window.location.href = "profile_page.html";
                        break;
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }
}

function checkUnchanged(){
    new_email = document.querySelector("#EmailAdd").value;
    new_phone = document.querySelector("#PhoneNum").value;
    new_mail = document.querySelector("#mailAdd").value;
    new_bill = document.querySelector("#billAdd").value;
    if(new_email == localStorage.getItem('email') && 
        new_phone == localStorage.getItem('phone') && 
        new_mail == localStorage.getItem('billA') && 
        new_bill == localStorage.getItem('mailA')){
        // alert("There's no change in this information.");
        swal("There's no change in this information.")
        return false;
    }
    else{
        return true;
    }
}

if(document.URL.includes('update_profile.html')){
    document.getElementById("EmailAdd").value = localStorage.getItem('email')
    document.getElementById("PhoneNum").value = localStorage.getItem('phone')
    document.getElementById("billAdd").value = localStorage.getItem('billA')
    document.getElementById("mailAdd").value = localStorage.getItem('mailA')
}