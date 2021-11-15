window.onload = getUserInfo();

async function getUserInfo(){
    var fac = localStorage.getItem("userID");
    console.log(fac);
    try {
        const response = await fetch(`http://localhost:5000/uid2/${fac}`);
        const jsonData = await response.json();
        let data = [];
        data = jsonData;
        console.log(data);
    }catch (err) {
      console.log(err.message);
    }
}