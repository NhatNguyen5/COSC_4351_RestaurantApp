// const { default: swal } = require("sweetalert");


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
            onclick="cancelRes(${data.indexOf(element)})">Cancel Reservation</button>`
            //console.log(data.indexOf(element))
            if(data.indexOf(element) != data.length-1)
                document.getElementById("resInfo").innerHTML += `<hr class="resInfo_line" style="width: 450px;">`
        });
    } else {
        document.getElementById("resInfo").innerHTML = `<br>You don't have any reservation.<br><br>`
    }
}

async function cancelRes(resDataIndex) {
    let cancel = false;
    console.log(data[resDataIndex].isholiday)
    if (data[resDataIndex].isholiday == "yes" ? true : false) {
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
                    cancel = true;
                    doThis(resDataIndex);
                    break;
           
                case "no":
                    cancel = false;
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
                    doThis(resDataIndex);
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
                    break;
           
                case "no":
                    break;
            }
        });
    }

    // if (cancel) {
    //     try {
    //         const body = {
    //             resID: data[resDataIndex].reservationid
    //         };
    //         const response = await fetch(`http://localhost:5000/cancelUserRes`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(body),
    //         });
    //         // alert("Reservation Canceled!");
    //         swal("Reservation Canceled!","","success");
    //         window.location.href = "user_reservations.html";
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

}

async function doThis(resDataIndex){
    try {
        const body = {
            resID: data[resDataIndex].reservationid
        };
        const response = await fetch(`http://localhost:5000/cancelUserRes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        // alert("Reservation Canceled!");
        // swal("Reservation Canceled!","","success");
        // window.location.href = "user_reservations.html";
        // window.location.reload()
    } catch (err) {
        console.log(err.message);
    }
}