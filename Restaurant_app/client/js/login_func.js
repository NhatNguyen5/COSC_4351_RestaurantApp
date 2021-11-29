const { response } = require("express");

var uid = findLastUID();

if (document.URL.includes('register_page.html')) {
    window.onload = prepFromReservation();
}
async function reserveInfo() {
    location.href = "reserve_info.html";
}

async function reserveSearch() {
    location.href = "reserve_search.html";
}

async function prepFromReservation() {
    if (localStorage.getItem("fname") != null) {
        document.querySelector("#nameF").value = localStorage.getItem("fname");
        document.querySelector("#nameL").value = localStorage.getItem("lname");
        document.querySelector("#mailE").value = localStorage.getItem("email");
        document.querySelector("#numP").value = localStorage.getItem("phone");
    }
}

async function insertUserCred() {
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
    if (document.forms.namedItem("register").reportValidity()) {
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
            const jsonData = await response.json();
            var data = [];
            data = jsonData;
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
        if(data == 0){
            var resAReg = true;
            if (localStorage.getItem("fname") != null) {
                // alert("Registration Successful!");
                swal("Success!", "Thank you for registering!", "success", {
                    buttons: {
                        yes: "Confirm"
                    },
                })
                .then((value) => {
                    switch (value) {          
                        case "yes":
                            resAReg = false;
                            reservationAfterReg();
                            break;
                    }
                }); 
            } 
            if(resAReg) {
                // alert("Registration Successful!");
                swal("Success!", "Thank you for registering!", "success", {
                    buttons: {
                        yes: "Confirm"
                    },
                })
                .then((value) => {
                    switch (value) {          
                        case "yes":
                            window.location.href = 'welcome_page.html';
                            break;
                    }
                }); 
            }
        } else {
            swal("Username already exist! Please choose a different one.")
        }
    }
}

async function reservationAfterReg() {
    try {
        const body = {
            ResID: localStorage.getItem("resID"),
            fistName: document.querySelector("#nameF").value,
            lastName: document.querySelector("#nameL").value,
            email: document.querySelector("#mailE").value,
            phone: document.querySelector("#numP").value,
            resDate: localStorage.getItem("date"),
            resTime: localStorage.getItem("time"),
            noOfSeats: parseInt(localStorage.getItem("noOfSeats")),
            tablePicked: localStorage.getItem("PickedTable"),
            prefPay: localStorage.getItem("prefPay"),
            isHoliday: localStorage.getItem("isHoliday") != 'false' ? "yes" : "no",
            userID: uid
        };
        const response = await fetch(`http://localhost:5000/reserveTable`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        // alert("Reservation has been put under new user account.");
        window.location.href = 'welcome_page.html';
    }
    catch (err) {
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
async function success_login() {
    var l_user = document.querySelector('#l_user').value;
    var l_pass = document.querySelector('#l_pass').value;
    var fac = l_user + ',' + l_pass;

    if (l_user.length == 0 || l_pass.length == 0) {
        // alert("Please fill all required field.");
        swal("Please fill all the required field");
        return false;
    }
    try {
        const response = await fetch(`http://localhost:5000/login/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        if (data[0].count == 1) {
            const result = await findUID(l_user);
            window.location.href = 'profile_page.html';
        }
        else {
            // alert("Incorrect Username or Password");
            swal("Incorrect Username or Password","","error");
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function findUID(l_user) {
    var fac = l_user;
    try {
        const response = await fetch(`http://localhost:5000/uid1/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        console.log(data[0].userid);
        localStorage.setItem("userID", data[0].userid);
    } catch (err) {
        console.log(err.message);
    }
}

function copyMailing() {
    document.getElementById('billA').value = document.getElementById('mailA').value;
}
