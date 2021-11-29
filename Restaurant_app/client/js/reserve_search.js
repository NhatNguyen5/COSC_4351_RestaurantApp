
var data = []
var emailCon = [];

async function SearchAndShow() {
    if (document.forms.namedItem("search_form").reportValidity()) {
        var fac = [2]
        fac[0] = document.getElementById("ResID").value;
        fac[1] = localStorage.getItem("userID") == null ? -1 : localStorage.getItem("userID");
        console.log(fac);
        try {
            const response = await fetch(`http://localhost:5000/searchResID/${fac}`);
            const jsonData = await response.json();
            data = jsonData;
            showRes();
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }
}
async function cancelRes() {
    console.log("Hello");
    console.log("Sup?");
    console.log(data[0].isholiday)
    if ((data[0].isholiday == "yes" ? true : false)) {
        swal("YOU WILL BE CHARGE $10! Are you sure you want to cancel?", {
            buttons: {
                yes: "Yes",
                no: "No",
            },
            closeOnClickOutside: false
        })
        .then((value) => {
            switch (value) {          
                case "yes":
                    doThis();
                    break;
           
                case "no":
                    break;
            }
        });
    } else {
        swal("Are you sure you want to cancel your reservation?", {
            buttons: {
                yes: "Yes",
                no: "No",
            },
            closeOnClickOutside: false
        })
        .then((value) => {
            switch (value) {
                case "yes":
                    doThis();    
                    break;
           
                case "no":
                    break;
            }
        });
    }

}

async function doThis(){
    var resID = document.querySelector("#ResID").value;
    var emailID = document.querySelector("#emailID").value;

    var emailData = [2]
    emailData[0] = document.getElementById("ResID").value;
    emailData[1] = document.getElementById("emailID").value;
    try {
        const body = {
            resID: resID,
            emailID: emailID
        };
        const confirm = await fetch(`http://localhost:5000/checkEmail/${emailData}`);
        const emailCred = await confirm.json();
        emailCon = emailCred;
        if (emailCon[0] != null) {
            const response = await fetch(`http://localhost:5000/cancelRes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            swal("Reservation Canceled!","","success",{
                buttons:{
                    ok: "Ok"
                },
            }).then((value) =>{
                switch(value){
                    case "ok":
                        window.location.reload();
                        break;
                    default:
                        window.location.reload();
                        break;
                }
            });
            // alert("Reservation Canceled!");
            // window.location.href = "reserve_search.html";
                
        }
        else
        {
            swal("Wrong Credentials","","error");
            // alert("Wrong Credentials");
        }
    } catch (err) {
        console.log(err.message);
    }
}

function showRes() {
    if (data[0] != null) {
        document.getElementById("resInfo").innerHTML = `<br>Guest Name: ${data[0].guestfirstname} ${data[0].guestlastname} <br><br>`
        //document.getElementById("resInfo").innerHTML += `Email: ${data[0].email}<br><br>`
        document.getElementById("resInfo").innerHTML += `Reservation Date: ${new Date(data[0].reservationdate).toLocaleDateString()}<br><br>`
        document.getElementById("resInfo").innerHTML += `Reservation Time: ${(data[0].reservationtime).slice(0, -3)}<br><br>`
        document.getElementById("resInfo").innerHTML += `Number of Guest(s): ${data[0].guestnumber}<br><br>`
        document.getElementById("resInfo").innerHTML += `Table Picked: ${data[0].tablepicked}<br><br>`
        document.getElementById("confirmation").innerHTML = 
        `<p><label for="ResNumber" class="mailN">Confirm your Email to Cancel Reservation</label></p>
        <input type="email" class="mail" id="emailID"/>`
        document.getElementById("cancel_field").innerHTML = 
        `<button type="button" type="submit" id="cancel_button" class="submit-btn" onclick="cancelRes()">Cancel Reservation</button>`
    } else {
        document.getElementById("cancel_field").innerHTML = '';
        document.getElementById("resInfo").innerHTML = `<br>No reservation with that ID, try again please. <br><br>`
    }
}