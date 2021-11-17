window.onload = SearchAndShow()

var data = []

async function SearchAndShow() {
    if (document.forms.namedItem("search_form").reportValidity()) {
        var fac = [2]
        fac[0] = '*';
        fac[1] = localStorage.getItem("userID");
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

function showRes() {
    if (data[0] != null) {
        data.forEach(element => {
            document.getElementById("resInfo").innerHTML += `<br>Reservation Date: ${new Date(element.reservationdate).toLocaleDateString()}<br><br>`
            document.getElementById("resInfo").innerHTML += `Reservation Time: ${(element.reservationtime).slice(0, -3)}<br><br>`
            document.getElementById("resInfo").innerHTML += `Number of Guest(s): ${element.guestnumber}<br><br>`
            document.getElementById("resInfo").innerHTML += `Table Picked: ${element.tablepicked}<br><br>`
            document.getElementById("resInfo").innerHTML += `<button input type="button" id="cancel_button" class="submit-btn-scroll"
            onclick="cancelRes(${element.reservationid})">Cancel Reservation</button>`
            console.log(data.indexOf(element))
            if(data.indexOf(element) != data.length-1)
                document.getElementById("resInfo").innerHTML += `<hr class="resInfo_line" style="width: 450px;">`
        });
    } else {
        document.getElementById("resInfo").innerHTML = `<br>You don't have any reservation.<br><br>`
    }
}

async function cancelRes(resID) {
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

    if (cancel) {
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
            window.location.href = "user_reservations.html";
        } catch (err) {
            console.log(err.message);
        }
    }

}