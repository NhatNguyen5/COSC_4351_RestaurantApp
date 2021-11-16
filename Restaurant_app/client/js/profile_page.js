var fname;
var lname;
var phone;
var email;
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
    email = data[0].email
    points = data[0].points
    document.getElementById("points").innerHTML = `Your Loyalty Points: ${points}`
    console.log(fname, lname, phone, email, points)
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
}