//get json file
async function getJSON() {
    return fetch('./scripts/data.json')
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}

//set table data
async function setData() {
    const json = await this.getJSON();

    //set table id
    var table = document.getElementById("data-table");

    //loop through json and set elements
    var i = 0;
    for (row in json){
        //create new row
        var row = table.insertRow();

        //create new columns
        console.log(json[i].name);
        var name = row.insertCell(0);
        var rf = row.insertCell(1);
        var ei = row.insertCell(2);
        var tc = row.insertCell(3);
        var is = row.insertCell(4);
        var acf = row.insertCell(5);
        var notes = row.insertCell(6);
        var datasets = row.insertCell(7);
        var confounds = row.insertCell(8);

        //set data to columns
        name.innerHTML = json[i].name;
        rf.innerHTML = "<img src=./images/" + json[i].id + "/RF.png>";
        ei.innerHTML = "<img src=./images/" + json[i].id + "/ei.png>";
        tc.innerHTML = "<img src=./images/" + json[i].id + "/TC.png>";
        is.innerHTML = "<img src=./images/" + json[i].id + "/anatomy.png>";
        acf.innerHTML = "<img src=./images/" + json[i].id + "/ACF.png>";
        notes.innerHTML = json[i].notes;
        datasets.innerHTML = json[i].datasets;
        confounds.innerHTML = json[i].confounds;

        i++;
    }
}

//menu toggle actions
function toggleMenu() {
    
    if (document.getElementById("display-cells").style.display == "none"){
        document.getElementById("menu").style.flex = 5;
        document.getElementById("display-cells").style.display = "block";
    } else {
        document.getElementById("menu").style.flex = 1;
        document.getElementById("display-cells").style.display = "none";
    }
}

document.getElementById("menu-icon").addEventListener("click", toggleMenu); 
getJSON();
setData();