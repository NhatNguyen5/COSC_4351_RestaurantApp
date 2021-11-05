var selectedTable = [];
var fullTableList = ['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','D1']
var notAvailTableList = [];
var availTableList = fullTableList;

async function getTableMap(){
    try {
      const response = await fetch(`http://localhost:5000/getTables`);
      const jsonData = await response.json();
      setTables(jsonData);
      //console.log(jsonData);
      displayTables(noAvailTableList);
    } catch (err) {
      console.log(err.message);
    }
}

const setTables = (data) => {
    noAvailTableList = data;
}

async function displayTables(tableList){
    tableList.forEach(element => {
        document.getElementById(element.tablecode).style.background='darkred';
        document.getElementById(element.tablecode).style.color='grey';
        document.getElementById(element.tablecode).disabled = true;
        availTableList = availTableList.filter(item => item !== element.tablecode);
    });
}

getTableMap();

async function updateMapToSeatNum(noOfSeats){
    
}

async function selectedTableUpdater(clicked_id){
    if(selectedTable.includes(clicked_id)){
        selectedTable = selectedTable.filter(item => item !== clicked_id);
        document.getElementById(clicked_id).style.background='#04aa6d';
        document.getElementById(clicked_id).style.color='white';
    }
    else{
        selectedTable.push(clicked_id);
        document.getElementById(clicked_id).style.background='#ffc445';
        document.getElementById(clicked_id).style.color='green';
    }

    alert(selectedTable);
}

