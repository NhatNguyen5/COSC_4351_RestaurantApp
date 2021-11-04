var selectedTable = [];
var tableList = [];

async function getTableMap(){
    try {
      const response = await fetch(`http://localhost:5000/getTables`);
      const jsonData = await response.json();
      setTables(jsonData);
      //console.log(jsonData);
      displayTables(tableList);
    } catch (err) {
      console.log(err.message);
    }
}

const setTables = (data) => {
    tableList = data;
}

async function displayTables(tableList){
    tableList.forEach(element => {
        document.getElementById(element.tablecode).style.background='darkred';
        document.getElementById(element.tablecode).style.color='grey';
        document.getElementById(element.tablecode).disabled = true;
    });
}

getTableMap();

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

