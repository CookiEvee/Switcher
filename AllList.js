/* 
This code is the code that adds nations names and passwords into storage for use in lists.
It does this by: when the submit button is clicked, gettings the list of all the nations, then adding it as an element.
It then sends the list back(after making sure the list exists or making a new one etc...)
There is a back button to navigate the menu and a mass input button to go to the page that allows mass input of nations.
*/

var AddButton = document.getElementById("AddButton");
AddButton.addEventListener("click",addNation);
//gets the button to add a nation to storage and adds a listener for when it is clicked.
document.getElementById('MassInput').addEventListener('click', MassInput);
//adds a listened for when the Mass Input button is clicked
document.getElementById('addPass').addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      //prevents the usual function
      AddButton.click();
      //If Enter is pressed whilst in the password field, it submits the nation to storage.
    }
});


let BackButton = document.getElementById('BackButton');
BackButton.addEventListener('click',Back)
//adds a listener to the button that goes back to the previous menu
function addNation(){
    let nationName = document.getElementById("addName").value;
    let nationPass = document.getElementById("addPass").value;
    //finds current value of the username and password inputs.
    let AllStorage = localStorage.getItem("all");
    let nationList = JSON.parse(AllStorage);
    //gets and parses current array for the list of all the nations
    if (nationList){
        nationList.push({"nation": nationName.toLowerCase().replaceAll(' ','_'),
            "password": nationPass});
        //if the list already exists then it just adds a nation to the array
    }else{
        nationList = [{"nation": nationName.toLowerCase().replaceAll(' ','_'),
            "password": nationPass}];
        //if the list does not exist then it creates the array
    }
    localStorage.setItem("all", JSON.stringify(nationList));
    //sends json back to local storage
    document.getElementById("addName").value = '';
    document.getElementById("addPass").value = '';
    location.reload();
    //empties the inputs and reloads the page
}

function Back(){
    window.location.href = 'popup.html';
}
//if the back button is pressed than the popup window is changed to the main menu

function MassInput(){
    window.location.href = 'MassPassword.html';
}
//if the Mass Input button is clicked then the popup window changes to the Mass Input menu