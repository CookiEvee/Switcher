/* 
This is the main page for the popup, and has all of the buttons to navigate around the popup
Each button takes the popup to a different page.
Pages: List creation, Adding a nation to storage, Choosing a list, Settings
*/

let buttonCreateList = document.getElementById("ListButton");
buttonCreateList.addEventListener("click",list)
//Adds an event listener for if the button to move to list is activated.
function list(){
    window.location.href = 'ListCreation.html';
    //if list is clicked, then go to the list menu
}

let ButtonAddNation = document.getElementById('AllButton');
ButtonAddNation.addEventListener("click",all);
//adds an event listener for if the button to add nations is activated
function all(){
    window.location.href = 'AllList.html';
    //if all is clicked, then go to the all menu
}

let ButtonChooseList = document.getElementById('ChooseListButton');
ButtonChooseList.addEventListener('click',choose);
//adds an event listener for if the button to choose a list a list is activated

function choose(){
    window.location.href = 'ChooseList.html';
    //if radio is clicked, then go to the choose list menu
}

let ButtonCreateNationSettings = document.getElementById('SetupNationParameters');
ButtonCreateNationSettings.addEventListener('click',CreateNationSettings);
//adds an event listener for if the button to choose a list a list is activated

function CreateNationSettings(){
    window.location.href = 'CreateNationSettings.html';
    //if radio is clicked, then go to the choose list menu
}
