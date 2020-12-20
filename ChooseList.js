let ChosenList = localStorage.getItem('ChosenList');
//finds the chosen list(current list)
if (ChosenList === null){
    //if it hasn't been picked, then autoset to all
    ChosenList = 'all';
    localStorage.setItem('ChosenList', 'all');
    //sends this fact to storage
}

let ButtonBack = document.getElementById('BackButton')
ButtonBack.addEventListener('click', Back);
//adds an event listener to the back button too allow the user to go back to the main menu

let ListNames = Object.keys(localStorage);
//searches for all the lists in storage
if (ListNames.indexOf('ListName')!== -1){
    //if ListName exists
    ListNames.splice(ListNames.indexOf('ListName'), 1);
    //gets rid of it
}
if (ListNames.indexOf('ChosenList')!== -1){
    //if ChosenList exists
    ListNames.splice(ListNames.indexOf('ChosenList'), 1)
    //gets rid of it
}
if (ListNames.indexOf('Links')!== -1){
    //if Links exists
    ListNames.splice(ListNames.indexOf('Links'), 1)
    //gets rid of it
}
if (ListNames.indexOf('Settings')!== -1){
    //if Settings exists
    ListNames.splice(ListNames.indexOf('Settings'), 1)
    //gets rid of it
}


let division = document.getElementById("ShowDiv");
let row = document.createElement("row");
//creates the elements for the table

var i;
for (i of ListNames){
    //for each list
    let element = document.createElement("div");
    let container = document.createElement("div");
    let span = document.createElement("span");
    let paragraph = document.createElement("div");
    let input = document.createElement('input');
    //creates the elements

    input.type = 'radio';
    input.name = 'list';
    input.value = i;
    input.setAttribute('class', 'radio text overflow');
    input.onchange = changeList;
    //input is a radiobutton, with a value of the list name, that when clicked activates changeList function
    if (i === ChosenList){
        input.checked = 'checked';
        //if the list is already chosen, it starts off being clicked
    }

    container.setAttribute("class","w3-container");
    container.setAttribute("class","card");
    //sets the class for the container, for GUI looks

    paragraph.innerHTML = i;
    paragraph.title = i;
    paragraph.setAttribute("class", "text overflow");
    //sets the text of the Buttons to the name of the list

    
    container.appendChild(paragraph);
    container.appendChild(input);
    element.appendChild(container);
    element.appendChild(span);
    row.appendChild(element);
    division.appendChild(row);
    //adds the elements to the table
}


function changeList(){
    localStorage.setItem('ChosenList',this.value); 
    //when clicked, choose the list that is clicked and send this information to storage
}

function Back(){
    window.location.href = 'popup.html';
    //go back to main menu
}