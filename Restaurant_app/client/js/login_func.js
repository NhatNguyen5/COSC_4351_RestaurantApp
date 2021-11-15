
async function reserveInfo()
{
    location.href = "reserve_info.html";
}

async function insertUserCred() {
    // const result = await findUID()
    if(uid == null){
        uid = 0;
    }
    var user = document.querySelector('#r_user').value;
    var pass = document.querySelector('#r_pass').value;
    var firstN = document.querySelector('#nameF').value;
    var lastN = document.querySelector('#nameL').value;
    var mailA = document.querySelector('#mailA').value;
    var billA = document.querySelector('#billA').value;
    var mailE = document.querySelector('#mailE').value;
    var numP = document.querySelector('#numP').value;
    var userid = uid;
    try{
        const body = {
            userid: userid,
            user: user, 
            pass: pass,
            fullname: firstN + ' ' + lastN,
            phone: numP,
            email: mailE,
            mailaddress: mailA,
            billaddress: billA,
            point: 0,
            preferpayment: 'Valid CreditCard'
            
        };
        const response = await fetch(`http://localhost:5000/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        alert("Registration Successful!");
        window.location.href = 'register_page.html';
    }catch (err) {
        console.log(err.message);
    }
}




