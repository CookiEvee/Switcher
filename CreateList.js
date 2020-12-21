/* 
This program creates new lists by, when the submit button is clicked the following happens:
1 - The Link List is gotten, and the database is checked to see if there is already a list with the name asked for
2 - The list is then created and the link for the list set to '' at the start.
*/

let buttonList = document.getElementById("ListButton");
buttonList.addEventListener("click",AddList)
//Adds a listener for when the create list button is clicked

//this function creates a New List
function AddList(){
    var LinkList = JSON.parse(localStorage.getItem('Links'));
    //this variable is the list of all Lists and links, declared as a global variable
    let ListName = document.getElementById('AddList').value;
    //The Name of the list
    let ListCheck = JSON.parse(localStorage.getItem(ListName));
    //Checks if the list already exists by attempting to retrieve it.

    if(ListCheck){
        document.getElementById('error').innerHTML = '<br>Name is taken,try again <br>"all" and "ListName" are taken.';
    //if the list already exists, it says that the list already exists
    }else if(LinkList){
        //checks if there is already is a list for the links, if there is then the following occurs:
        localStorage.setItem(ListName,'')
        //Creates the list for use later
        LinkList[ListName] = '';
        //sets the link to be empty
        localStorage.setItem('Links',JSON.stringify(LinkList));
        //appends the link to the List for links
        document.getElementById('error').innerHTML = '[]';
        //resets the previous error code
        location.reload()
        //reloads the page
    }else{
        //otherwise, if the list for links doesn't exist
        localStorage.setItem(ListName,'')
        //Creates the list
        LinkList = {};
        LinkList[ListName] = '';
        //creates a dictionary, and sets the link for the current list to be empty
        localStorage.setItem('Links',JSON.stringify(LinkList));
        //adds the dictionary to local storage
        document.getElementById('error').innerHTML = '[]';
        //resets any error codes
        location.reload()
        //reloads the page
    }
} 