let ListNames = Object.keys(localStorage);
//gets the lists from storage
if(ListNames.indexOf('all')!== -1){
    //if the 'all' list exists
    ListNames.splice(ListNames.indexOf('all'),1);
    //removes it from the array
}
if (ListNames.indexOf('ListName')!== -1){
        //if the 'ListName' list exists
    ListNames.splice(ListNames.indexOf('ListName'), 1);
        //removes it from the array
}
if (ListNames.indexOf('ChosenList')!== -1){
        //if the 'ChosenList' list exists
    ListNames.splice(ListNames.indexOf('ChosenList'), 1)
        //removes it from the array
}
if (ListNames.indexOf('Links')!== -1){
        //if the 'Links' list exists
    ListNames.splice(ListNames.indexOf('Links'), 1)
        //removes it from the array
}
if (ListNames.indexOf('Settings')!== -1){
    //if the 'Settings' list exists
ListNames.splice(ListNames.indexOf('Settings'), 1)
    //removes it from the array
}

let division = document.getElementById("ShowDiv");
let row = document.createElement("row");
//creates the table for the GUI

document.getElementById('BackButton').addEventListener('click', Back);
//adds a listener for if the BackButton is clicked, to go back a menu

var i;
//declares the variable for use in functions
for (i of ListNames){
    let element = document.createElement("div");
    let container = document.createElement("div");
    let closeButton = document.createElement("button");
    let extendButton = document.createElement("button");
    let span = document.createElement("span");
    let paragraph = document.createElement("paragraph");
    //creates the elements needed for the table

    container.setAttribute("class","w3-container");
    container.setAttribute("class","card");
    //sets the class of the container

    paragraph.innerHTML = i;
    paragraph.setAttribute("class", "paragraphing")
    //sets the inner text to the list 

    closeButton.setAttribute("class","close");
    closeButton.addEventListener("click", DeleteList)
    closeButton.innerHTML = '&times';
    //creates a button with an event listener in case it's clicked to remove a list

    extendButton.setAttribute("class","extend")
    extendButton.addEventListener("click", Expand);
    extendButton.innerHTML = '&#x21D3';
    //creates a button with an event listener if it is clicked to extened the list(changes the GUI)
    
    container.appendChild(paragraph);
    container.appendChild(closeButton);
    container.appendChild(extendButton);
    element.appendChild(container);
    element.appendChild(span);
    row.appendChild(element);
    division.appendChild(row);
    //adds the elements to the table
}

function DeleteList(){
    localStorage.removeItem(this.parentElement.children[0].innerHTML)
    //deletes the list from localstorage
    location.reload()
    //reloads the page
}

function Expand(){
    localStorage.removeItem('ListName');
    //removes the current listname
    localStorage.setItem('ListName',this.parentElement.children[0].innerHTML);
    //sets the listname to the one that has been extended
    window.location.href = 'ShowList.html';
    //changes location to the extended list page
}

function Back(){
    window.location.href = 'popup.html';
    //goes back to the main menu
}
