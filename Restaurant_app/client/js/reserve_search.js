var validID = false
var data = []

async function SearchAndShow() {
    if (document.forms.namedItem("search_form").reportValidity()) {
        var fac = document.getElementById("ResID").value;
        console.log(fac);
        try {
            const response = await fetch(`http://localhost:5000/searchResID/${fac}`);
            const jsonData = await response.json();
            data = jsonData;
            if (data[0] != null) {
                validID = true;
            } else {
                validID = false;
            }
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
    var resID = document.querySelector("#ResID").value;
    let cancel = false;
    console.log(data[0].isholiday)
    if (data[0].isholiday == "yes" ? true : false) {
        let holiday_cancel_confirm = confirm("YOU WILL BE CHARGE $10! Are you sure you want to cancel?")
        if (holiday_cancel_confirm) {
            cancel = true
        } else {
            cancel = false
        }
    } else {
        let holiday_cancel_confirm = confirm("Cancel reservation?")
        if (holiday_cancel_confirm) {
            cancel = true
        } else {
            cancel = false
        }
    }
    if(cancel){
        try {
            const body = {
                resID: resID
            };
            const response = await fetch(`http://localhost:5000/cancelRes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            alert("Reservation Canceled!");
            window.location.href = "reserve_search.html";
        } catch (err) {
            console.log(err.message);
        }
    }

}

function showRes() {
    if (data[0] != null) {
        document.getElementById("resInfo").innerHTML = `<br>Guest Name: ${data[0].guestfirstname} ${data[0].guestlastname} <br><br>`
        document.getElementById("resInfo").innerHTML += `Email: ${data[0].email}<br><br>`
        document.getElementById("resInfo").innerHTML += `Reservation Date: ${new Date(data[0].reservationdate).toLocaleDateString()}<br><br>`
        document.getElementById("resInfo").innerHTML += `Reservation Time: ${(data[0].reservationtime).slice(0, -3)}<br><br>`
        document.getElementById("resInfo").innerHTML += `Number of Guest(s): ${data[0].guestnumber}<br><br>`
        document.getElementById("resInfo").innerHTML += `Table Picked: ${data[0].tablepicked}<br><br>`
        document.getElementById("cancel_field").innerHTML = `<button input type="button" id="cancel_button" class="submit-btn"
        onclick="cancelRes()">Cancel Reservation</button>`
    } else {
        document.getElementById("cancel_field").innerHTML = '';
        document.getElementById("resInfo").innerHTML = `<br>No reservation with that ID, try again please. <br><br>`
    }
}