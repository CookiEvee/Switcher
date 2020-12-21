/* 
This program is for adding a nation to a list
It does this by scanning through the mass input, seperated by new lines.
And for each nation, checks if it is in the All list, and if it is it adds it to the List.
Once done it sends the list back to localStorage.
Also has a back button for navigation
*/

document.getElementById('SubmitMass').addEventListener('click', MassText);
//adds an event listener for if the Mass Button is clicked
document.getElementById('BackButton').addEventListener('click', Back);
//adds an event listener for if the Button to go back to the main menu is click
var i;
var nationName;
//declares the variables for use in functions
function MassText(){
    let StorageList = localStorage.getItem(localStorage.getItem('ListName'));
    //gets the list to be edited
    try {
        nationList = JSON.parse(StorageList);
        //tries to parse the list
    }catch(err){
        nationList = null;
        //if the list doesn't exist sets it to null.
    }
    //gets the list that is getting edited.
    for (nationName of document.getElementById('textarea').value.split('\n')){
        //for each nation in the document(split by new lines)
        i = nationName.toLowerCase().trim();
        //trims and lowercases the input

        let inAll = JSON.parse(localStorage.getItem('all')).some(CheckInAll);
        //checks if the nation is in the all list
        if (nationList && inAll){
            //if the nation is in the all list
            nationList.push({"nation": nationName.toLowerCase(), 'link': '/'});
            document.getElementById('error').innerHTML ='';
            //adds the nation to the list and resets all error messages
        }else if(inAll){
            //otherwise if the list doesn't exist
            nationList = [{"nation": nationName.toLowerCase(), 'link': '/'}]
            document.getElementById('error').innerHTML = '';
            //creates the list and resets all error messages
        }else{
            document.getElementById('error').innerHTML = '<br>'+nationName+'is not registered<br>add it to the all list first.'
            //if the nation is not in the all list, sends an error message saying so
            return;
            //stops the code
        }
        localStorage.setItem(localStorage.getItem('ListName'), JSON.stringify(nationList));
        //sends the edited list to storage
        document.getElementById("textarea").value = '';
        //resets the input area
    }
    location.reload()
    //reloads the page
}

function CheckInAll(nation){
    return nation['nation'] === i
    //returns true if the nation is the one that is wanted(checks through the all list to see if a nation is in there)
}

function Back(){
    window.location.href = 'ListCreation.html';
    //changes location to the previous menu
}
