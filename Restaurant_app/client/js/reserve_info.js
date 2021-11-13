/*
Sources:
Holiday checker: https://stackoverflow.com/questions/58511847/calculating-holidays-in-javascript
*/
window.onload = setInfo();
window.onload = getTableMap();
window.onload = checkHoliday(document.getElementById('date').value);

var availableTime = Array.from(Array(10).keys())
var fullTableList = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'D1']
var availTableList = [];
var notAvailTableList = [];
var isHoliday = false;
var whatHoliday;

async function getTableMap() {
    var fac = [2];
    fac[0] = document.getElementById('date').value;
    fac[1] = document.getElementById('time').value;
    try {
        const response = await fetch(`http://localhost:5000/getTables/${fac}`);
        const jsonData = await response.json();
        setTables(jsonData);
        updateMaxSeatNum()
    } catch (err) {
        console.log(err.message);
    }
}

const setTables = (data) => {
    var tempTable = []
    data.forEach(element => {
        let tempStr = element.tablepicked.split(',');
        tempStr.forEach(element1 => {
            tempTable.push(element1);
        });
    });
    console.log(tempTable);
    notAvailTableList = tempTable;
    //console.log(notAvailTableList)
}

async function checkHoliday(){
    var fac = [2]
    fac[0] = document.getElementById('date').value;
    fac[1] = 'GMT-0600';
    try {
        const response = await fetch(`http://localhost:5000/checkHoliday/${fac}`)
        const jsonData = await response.json();
        isHoliday = (jsonData != false) ? true : false;
        whatHoliday = (jsonData != false) ? `It's ${jsonData[0].name}.` : "Not a Holiday.";
        if(!isHoliday){
            document.getElementById('preferPay').innerHTML = `<option value="Cash">Cash</option>`
            document.getElementById('preferPay').innerHTML += `<option value="Valid_Creditcard">Valid Creditcard</option>`
            document.getElementById('preferPay').innerHTML += `<option value="Invalid_Creditcard">Invalid Creditcard (for testing purposes)</option>`
        } else {
            document.getElementById('preferPay').innerHTML = `<option value="Valid_Creditcard">Valid Creditcard</option>`
            document.getElementById('preferPay').innerHTML += `<option value="Invalid_Creditcard">Invalid Creditcard (for testing purposes)</option>`
        }
    } catch (err) {
        console.log(err.message);
    }
    
    console.log(whatHoliday);
}

function updateMaxSeatNum() {
    var maxSeatNum = 0;
    availTableList = fullTableList;
    notAvailTableList.forEach(element => {
        availTableList = availTableList.filter(item => item != element);
    });
    //console.log(notAvailTableList);
    availTableList.forEach(element => {
        maxSeatNum += (
            (element[0] == 'A') ? 2 :
                (element[0] == 'B') ? 4 :
                    (element[0] == 'C') ? 6 : 8
        );
    });
    if (maxSeatNum == 0) {
        document.getElementById('noOfSeats').type = 'text';
        document.getElementById('noOfSeats').value = 'No available seat';
        document.getElementById('noOfSeats').max = 1;
        document.getElementById('noOfSeats').disabled = true;
        document.getElementById('submit_info').disabled = true;
    } else {
        document.getElementById('noOfSeats').type = 'number';
        document.getElementById('noOfSeats').value = 1;
        document.getElementById('noOfSeats').min = 1;
        document.getElementById('noOfSeats').max = maxSeatNum;
        document.getElementById('noOfSeats').disabled = false;
        document.getElementById('submit_info').disabled = false;
    }
}

console.log(document.forms.namedItem("reserve_info_form").reportValidity());

async function checkCard() {
    if(document.forms.namedItem("reserve_info_form").reportValidity()){
        if(isHoliday){
            if(document.getElementById('preferPay').value == "Valid_Creditcard"){
                passInfo();
            }else{
                alert("Card is invalid! Please try a different one!");
            }
        } else {
            passInfo();
        }
    }
}

async function passInfo() {
    localStorage.setItem("fname", document.getElementById('firstN').value);
    localStorage.setItem("lname", document.getElementById('lastN').value);
    localStorage.setItem("email", document.getElementById('EmailAdd').value);
    localStorage.setItem("phone", document.getElementById('PhoneNum').value);
    localStorage.setItem("date", document.getElementById('date').value);
    localStorage.setItem("time", document.getElementById('time').value);
    localStorage.setItem("noOfSeats", document.getElementById('noOfSeats').value);
    localStorage.setItem("notAvailTab", notAvailTableList);
    localStorage.setItem("prefPay", document.getElementById('preferPay').value);
    console.log("Go to table!");
    window.location.href = 'reserve_table.html';
}

async function setInfo() {
    setMinMaxDate();
    setAvailableTime();
}

function setAvailableTime() {
    var availableTime = Array.from(Array.from(Array(11).keys()), x => x + 9);
    availableTime.forEach(element => {
        document.getElementById('time').innerHTML += `<option value="${element}">${element}:00 - ${element + 1}:00</option>`
    });
}

function setMinMaxDate() {
    var today = new Date();
    var limit = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').min = today;
    document.getElementById('date').value = today;

    dd = limit.getDate();
    mm = limit.getMonth() + 1;
    yyyy = limit.getFullYear();

    if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10) {

        if (dd == 29 && mm == 1) {
            if (yyyy % 4 != 0) {
                mm = 2;
                dd = 1;
            }
        }

        if (dd == 30 && mm == 1) {
            if (yyyy % 4 != 0) {
                mm = 2;
                dd = 2;
            } else {
                mm = 2;
                dd = 1;
            }
        }

        if (dd == 31) {
            mm += 1;
            if (mm != 1) {
                dd = 1;
            } else {
                if (yyyy % 4 != 0) {
                    dd = 3;
                } else {
                    dd = 2;
                }
            }
        }
    }//30 days into the future
    else if (mm == 12) {
        yyyy += 1;
        mm = 1;
    }
    else {
        mm += 1;
    }

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    limit = yyyy + '-' + mm + '-' + dd;

    console.log("Last date: " + limit);

    document.getElementById('date').max = limit;
}