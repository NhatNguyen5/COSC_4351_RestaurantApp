var selectedTable = [];
var fullTableList = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'D1']
var notAvailTableList = [];
var availTableList = [];
var noOfSeatReq = document.getElementById('noOfSeats').value;;
var noOf2Left = 4;
var noOf4Left = 4;
var noOf6Left = 3;
var noOf8Left = 1;

window.onload = getTableMap;


async function getTableMap() {
    try {
        const response = await fetch(`http://localhost:5000/getTables`);
        const jsonData = await response.json();
        setTables(jsonData);
        //console.log(jsonData);
        displayTables();
        updateMapToSeatNum(noOfSeatReq);
    } catch (err) {
        console.log(err.message);
    }
}

const setTables = (data) => {
    notAvailTableList = data;
}

async function displayTables() {
    availTableList = fullTableList;
    notAvailTableList.forEach(element => {
        noOf2Left -= (element.tablecode[0] == 'A') ? 1 : 0;
        noOf4Left -= (element.tablecode[0] == 'B') ? 1 : 0;
        noOf6Left -= (element.tablecode[0] == 'C') ? 1 : 0;
        noOf8Left -= (element.tablecode[0] == 'D') ? 1 : 0;

        document.getElementById(element.tablecode).style.background = 'darkred';
        document.getElementById(element.tablecode).style.color = 'grey';
        document.getElementById(element.tablecode).disabled = true;
        availTableList = availTableList.filter(item => item !== element.tablecode);
    });

    updateMaxSeatNum();

    console.log(noOf2Left, noOf4Left, noOf6Left, noOf8Left)
}

async function updateMapToSeatNum(noOfSeats) {
    //not done
    if (noOfSeats <= 8) {
        /*
        disableGroup('A');
        disableGroup('B');
        disableGroup('C');
        disableGroup('D');
        */
        if ((noOfSeats <= 2 && noOf2Left > 0) || 
            (noOfSeats <= 4 && noOf4Left == 0 && noOf2Left > 1) ||
            (noOfSeats <= 6 && noOf6Left == 0 && noOf4Left == 0 && noOf2Left > 2)) {
            enableGroup('A');
            disableGroup('B');
            disableGroup('C');
            disableGroup('D');
        } else {
            if (noOfSeats <= 4 && noOf4Left > 0) {
                enableGroup('B');
                disableGroup('A');
                disableGroup('C');
                disableGroup('D');
            } else {
                if (noOfSeats <= 6 && noOf6Left > 0) {
                    enableGroup('C');
                    disableGroup('B');
                    disableGroup('A');
                    disableGroup('D');
                } else {
                    if (noOfSeats <= 8 && noOf8Left > 0) {
                        enableGroup('D');
                        disableGroup('B');
                        disableGroup('C');
                        disableGroup('A');
                    }
                }
            }
        }
    } else {
        if (noOf8Left > 0) {
            enableGroup('D');
        } else {
            if (noOf6Left > 0) {
                enableGroup('C');
            } else {
                if (noOf4Left > 0) {
                    enableGroup('B');
                } else {
                    if (noOf2Left > 0) {
                        enableGroup('A');
                    }
                }
            }
        }
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

function updateMaxSeatNum() {
    var maxSeatNum = 0;
    availTableList.forEach(element => {
        maxSeatNum += (
            (element[0] == 'A') ? 2 :
                (element[0] == 'B') ? 4 :
                    (element[0] == 'C') ? 6 : 8
        );
    });
    document.getElementById('noOfSeats').max = maxSeatNum;
}

async function selectedTableUpdater(clicked_id) {
    if (selectedTable.includes(clicked_id)) {
        selectedTable = selectedTable.filter(item => item !== clicked_id);
        document.getElementById(clicked_id).style.background = '#04aa6d';
        document.getElementById(clicked_id).style.color = 'white';
        noOfSeatReq += (
            clicked_id[0] == 'A' ? 2 :
                clicked_id[0] == 'B' ? 4 :
                    clicked_id[0] == 'C' ? 6 : 8
        );
    }
    else {
        selectedTable.push(clicked_id);
        document.getElementById(clicked_id).style.background = '#ffc445';
        document.getElementById(clicked_id).style.color = 'green';
        noOfSeatReq -= (
            clicked_id[0] == 'A' ? 2 :
                clicked_id[0] == 'B' ? 4 :
                    clicked_id[0] == 'C' ? 6 : 8
        );
    }

    if (noOfSeatReq < 6)

        console.log(noOfSeatReq);
    /*
    (clicked_id[0] == 'A') ? 

    alert(selectedTable);
    */
}

