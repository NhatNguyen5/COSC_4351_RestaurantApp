var selectedTable = [];
var fullTableList = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'D1']
var notAvailTableList = [];
var availTableList = [];
var noOfSeatReq = 0;
var info = [];
var ReservationID = 0;

//info[0][0]: first name
//info[0][1]: last name
//info[1]: email
//info[2]: phone
//info[3]: date
//info[4]: time
//info[5]: noOfSeats
//info[6]: prefer payment method

window.onload = getInfo();
window.onload = findLastGResID();

document.getElementById("submit_table").disabled = true;

async function getInfo() {
    try {
        //console.log(jsonData);
        if (localStorage.getItem("fname") != null && localStorage.getItem("lname") != null) {
            info.push([localStorage.getItem("fname"), localStorage.getItem("lname")]);
        } else {
            info.push(null);
        }
        if (localStorage.getItem("email") != null) {
            info.push(localStorage.getItem("email"));
        } else {
            info.push(null);
        }
        if (localStorage.getItem("phone") != null) {
            info.push(localStorage.getItem("phone"));
        } else {
            info.push(null);
        }
        if (localStorage.getItem("date") != null) {
            info.push(localStorage.getItem("date"));
        } else {
            info.push(null);
        }
        if (localStorage.getItem("time") != null) {
            info.push(localStorage.getItem("time"));
        } else {
            info.push(null);
        }
        if (localStorage.getItem("noOfSeats") != null) {
            info.push(parseInt(localStorage.getItem("noOfSeats")));
            noOfSeatReq = info[5];
        }
        if (localStorage.getItem("notAvailTab") != null) {
            notAvailTableList = (localStorage.getItem("notAvailTab")).split(',');
            if (notAvailTableList[0] == '') {
                notAvailTableList = [];
            }
        }
        if (localStorage.getItem("prefPay") != null) {
            info.push(localStorage.getItem("prefPay"));
        } else {
            info.push(null);
        }
        displayTables();
    } catch (err) {
        console.log(err.message);
    }
}

async function displayTables() {
    availTableList = fullTableList;
    notAvailTableList.forEach(element => {
        document.getElementById(element).style.background = 'darkred';
        document.getElementById(element).style.color = 'grey';
        document.getElementById(element).disabled = true;
        availTableList = availTableList.filter(item => item !== element);
    });
}

async function reservedTablePost() {
    try {
        if (localStorage.getItem("userID") == '1') {
            // let registerAsk = confirm("Reservation Successful! \n\nCREATE AN ACCOUNT WITH US FOR POINTS AND DISCOUNT?")
            swal("???", {
                title: "Hello valuable customer!",
                text: "CREATE AN ACCOUNT WITH US FOR POINTS AND DISCOUNT?",
                buttons: {
                    yes: "Yes",
                    no: "No",
                },
                closeOnClickOutside: false
            })
            .then((value) => {
                switch (value) {          
                    case "yes":
                        localStorage.setItem("PickedTable", selectedTable);
                        localStorage.setItem("resID", ReservationID);
                        window.location.href = 'register_page.html';
                        break;
               
                    case "no":
                        tryThis();
                        break;
                }
            });
            // if (registerAsk) {
            //     localStorage.setItem("PickedTable", selectedTable);
            //     localStorage.setItem("resID", ReservationID);
            //     window.location.href = 'register_page.html';
            // } else {
            //     const body = {
            //         ResID: ReservationID,
            //         fistName: info[0][0],
            //         lastName: info[0][1],
            //         email: info[1],
            //         phone: info[2],
            //         resDate: info[3],
            //         resTime: info[4],
            //         noOfSeats: info[5],
            //         tablePicked: selectedTable,
            //         prefPay: info[6],
            //         isHoliday: localStorage.getItem("isHoliday") != 'false' ? "yes" : "no",
            //         userID: localStorage.getItem("userID")
            //     };
            //     const response = await fetch(`http://localhost:5000/reserveTable`, {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify(body)
            //     });
            //     window.location.href = 'welcome_page.html';
            // }
        } else {
            const body = {
                ResID: ReservationID,
                fistName: info[0][0],
                lastName: info[0][1],
                email: info[1],
                phone: info[2],
                resDate: info[3],
                resTime: info[4],
                noOfSeats: info[5],
                tablePicked: selectedTable,
                prefPay: info[6],
                isHoliday: localStorage.getItem("isHoliday") != 'false' ? "yes" : "no",
                userID: localStorage.getItem("userID")
            };
            const response = await fetch(`http://localhost:5000/reserveTable`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // let registerAsk = confirm("Reservation Successful! \n\nDo you want to log out?")
            // if (registerAsk) {
            //     window.location.href = 'welcome_page.html';
            // } else {
            //     window.location.href = 'profile_page.html';
            // }
            swal("???", {
                title:"Reservation Successful!",
                text:"Do you want to log out?",
                buttons: {
                    yes: "Yes",
                    no: "No",
                },
                closeOnClickOutside: false
            })
            .then((value) => {
                switch (value) {          
                    case "yes":
                        window.location.href = 'welcome_page.html';
                        break;
               
                    case "no":
                        window.location.href = 'profile_page.html';
                        break;
                }
            });
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function tryThis(){
    const body = {
        ResID: ReservationID,
        fistName: info[0][0],
        lastName: info[0][1],
        email: info[1],
        phone: info[2],
        resDate: info[3],
        resTime: info[4],
        noOfSeats: info[5],
        tablePicked: selectedTable,
        prefPay: info[6],
        isHoliday: localStorage.getItem("isHoliday") != 'false' ? "yes" : "no",
        userID: localStorage.getItem("userID")
    };
    const response = await fetch(`http://localhost:5000/reserveTable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    swal("???", {
        title: "Reservation Successful!",
        text: `Your reservation number is: ${ReservationID}\n(Store this number for reservation look up)\n`,
        buttons: {
            yes: "Confirm",
        },
        closeOnClickOutside: false
    })
    .then((value) => {
        switch (value) {          
            case "yes":
                window.location.href = 'welcome_page.html';
                break;
        }
    });
}

async function findLastGResID() {
    try {
        const response = await fetch(`http://localhost:5000/resid`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        console.log(data);
        if (data.length == 0 || data.length == null) {
            ReservationID = 0;
        }
        else {
            ReservationID = parseInt(data[0].reservationid) + 1;
        }
        console.log(ReservationID);
    } catch (err) {
        console.log(err.message);
    }
}

async function updateMapToSeatNum(noOfSeats, update) {
    console.log(info);
    if (update) {
        noOfSeatReq = noOfSeats;
        selectedTable.forEach(element => {
            selectedTableUpdater(element);
        });
        enableGroup('A');
        enableGroup('B');
        enableGroup('C');
        enableGroup('D');
    }
    if (noOfSeatReq <= 0) {

        disableGroup('A');
        disableGroup('B');
        disableGroup('C');
        disableGroup('D');
    }
}

async function disableSingle(id) {
    document.getElementById(id).style.background = '#adff85';
    document.getElementById(id).style.color = 'white';
    document.getElementById(id).disabled = true;
}

async function enableSingle(id) {
    document.getElementById(id).style.background = '#04aa6d';
    document.getElementById(id).style.color = 'white';
    document.getElementById(id).disabled = false;
}

async function disableGroup(groupId) {
    availTableList.forEach(element => {
        if (element[0] == groupId) {
            disableSingle(element);
        }
    });
}

async function enableGroup(groupId) {
    availTableList.forEach(element => {
        if (element[0] == groupId) {
            enableSingle(element);
        }
    });
}

async function selectedTableUpdater(clicked_id) {
    console.log(ReservationID);
    if (selectedTable.includes(clicked_id)) {
        availTableList.push(clicked_id);
        selectedTable = selectedTable.filter(item => item !== clicked_id);
        document.getElementById(clicked_id).style.background = '#04aa6d';
        document.getElementById(clicked_id).style.color = 'white';
        noOfSeatReq += (
            clicked_id[0] == 'A' ? 2 :
                clicked_id[0] == 'B' ? 4 :
                    clicked_id[0] == 'C' ? 6 : 8
        );
        updateMapToSeatNum(noOfSeatReq, false)
    }
    else {
        selectedTable.push(clicked_id);
        availTableList = availTableList.filter(item => item !== clicked_id);
        document.getElementById(clicked_id).style.background = '#ffc445';
        document.getElementById(clicked_id).style.color = 'green';
        noOfSeatReq -= (
            clicked_id[0] == 'A' ? 2 :
                clicked_id[0] == 'B' ? 4 :
                    clicked_id[0] == 'C' ? 6 : 8
        );
        updateMapToSeatNum(noOfSeatReq, false)
    }

    if (noOfSeatReq > 0) {
        enableGroup('A');
        enableGroup('B');
        enableGroup('C');
        enableGroup('D');
        document.getElementById("submit_table").disabled = true;
    } else {
        document.getElementById("submit_table").disabled = false;
    }

    console.log(noOfSeatReq);

    //alert(selectedTable);

}