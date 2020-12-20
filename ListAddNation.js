document.getElementById('AddNationButton').addEventListener('click',addNation);
//adds a listener for when the user attempts to add a nation to the list
document.getElementById('AddLinkButton').addEventListener('click',AddLink);
//adds a listener for when the user changes where the page will go to when logged in.
document.getElementById('MassInput').addEventListener('click',Mass);
//adds a listener for when the user click the mass input button, to go to the mass input page
document.getElementById('addName').addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("AddNationButton").click();
      //adds the nation to the list by activating the button
    }
});
document.getElementById('addLink').value = JSON.parse(localStorage.getItem('Links'))[localStorage.getItem('ListName')]
document.getElementById('BackButton').addEventListener('click', Back);
//adds a listener for if the button to go to the menu is clicked.
function addNation(){
    var nationList
    let nationName = document.getElementById("addName").value;
    //finds current value of the username input field
    let storageList = localStorage.getItem(localStorage.getItem('ListName'));
    //retrieves the List of the currently chosen list(listName)
    try {
        nationList = JSON.parse(storageList);
        //tries to parse the list
    }catch(err){
        nationList = null;
        //if the List does not exist then it sets it to null, to be dealt with later.
    }
    let inAll = JSON.parse(localStorage.getItem('all')).some(CheckInAll);
    //Checks if the nation input is in the all list(so it has a password)
    if (nationList && inAll){
        nationList.push({"nation": nationName.toLowerCase(), 'link': '/'});
        document.getElementById('error').innerHTML ='';
        //if the nation is in the all list, the list exists, then add the nation to the list and reset any error messages.
    }else if(inAll){
        nationList = [{"nation": nationName.toLowerCase(), 'link': '/'}]
        document.getElementById('error').innerHTML = '';
        //otherwise if the nation is in the all list, create the list and reset any error messages.
    }else{
        document.getElementById('error').innerHTML = '<br>nation is not registered<br>add it to the all list first.'
        return;
        //otherwise send an error message.
    }
    localStorage.setItem(localStorage.getItem('ListName'), JSON.stringify(nationList));
    //sends the List to storage to be retrieved later
    document.getElementById("addName").value = '';
    //resets the input fields
    location.reload();
    //reloads the page
}

function CheckInAll(nation){
    return nation['nation'] === document.getElementById('addName').value
    //returns if the nation is the one in the input field
}

function Back(){
    window.location.href = 'ListCreation.html';
    //goes to the previous menu
}

function Mass(){
    window.location.href = 'MassInputAll.html';
    //goes to the mass input menu
}

function AddLink(){
    let LinkList = JSON.parse(localStorage.getItem('Links'));
    //finds the dictionary for the list of links
    LinkList[localStorage.getItem('ListName')] = document.getElementById('addLink').value;
    //sets the link for the current list to the one requested
    localStorage.setItem('Links',JSON.stringify(LinkList));
    //send the dictionary back to storage
    location.reload();
    //reloads the page
}