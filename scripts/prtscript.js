window.onload = (event) => {
    document.getElementById("menu-icon").addEventListener("click", toggleMenu); 
    initMultiselect();
};

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
    var dropdown = document.getElementById("mySelectOptions");

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

        //set dropdown elements
        var elementToAppend = '<label for=' + json[i].id + '><input type="checkbox" id=' + json[i].id + ' onchange="checkboxStatusChange()" value=' + json[i].id + ' />' + json[i].name + '</label>';
        dropdown.insertAdjacentHTML('beforeend', elementToAppend);
        i++;
    }
}

//menu toggle actions
function toggleMenu() {
    
    if (document.getElementById("display-cells").style.display == "none"){
        document.getElementById("menu").style.flex = 10;
        document.getElementById("display-cells").style.display = "block";
    } else {
        document.getElementById("menu").style.flex = 1;
        document.getElementById("display-cells").style.display = "none";
    }
}

function initMultiselect() {
    checkboxStatusChange();
  
    document.addEventListener("click", function(evt) {
      var flyoutElement = document.getElementById('myMultiselect'),
        targetElement = evt.target; // clicked element
  
      do {
        if (targetElement == flyoutElement) {
          // This is a click inside. Do nothing, just return.
          //console.log('click inside');
          return;
        }
  
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);
  
      // This is a click outside.
      toggleCheckboxArea(true);
      //console.log('click outside');
    });
  }
  
  function checkboxStatusChange() {
    var multiselect = document.getElementById("mySelectLabel");
    var multiselectOption = multiselect.getElementsByTagName('option')[0];
  
    var values = [];
    var checkboxes = document.getElementById("mySelectOptions");
    var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');
  
    for (const item of checkedCheckboxes) {
      var checkboxValue = item.getAttribute('value');
      values.push(checkboxValue);
    }
  
    var dropdownValue = "Nothing is selected";
    if (values.length > 0) {
      dropdownValue = values.join(', ');
    }
  
    multiselectOption.innerText = dropdownValue;
  }
  
  function toggleCheckboxArea(onlyHide = false) {
    var checkboxes = document.getElementById("mySelectOptions");
    var displayValue = checkboxes.style.display;
  
    if (displayValue != "block") {
      if (onlyHide == false) {
        checkboxes.style.display = "block";
      }
    } else {
      checkboxes.style.display = "none";
    }
  }

getJSON();
setData();