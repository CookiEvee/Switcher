document.getElementById('ListName').innerHTML = localStorage.getItem('ListName');
//makes the title of the page the current chosen list
var CurrentList;
//declares this variable for use in a function
try{
    CurrentList = JSON.parse(localStorage.getItem(localStorage.getItem('ListName')));
    //finds the list which the user chose
}catch(err){
    CurrentList = null;
    //if the list doesn't exist, sets it to null for use later.
}
let division = document.getElementById("ShowDiv");
let row = document.createElement("row");
//creates elements to construct a table

var i;
if (CurrentList){
    //if the list exists
    for (i of CurrentList){
        //for each of the nations
        let element = document.createElement("div");
        element.setAttribute("class","element");
        //creates a parent element

        let container = document.createElement("div");
        container.setAttribute("class","w3-container card");
        //sets up a container to construct the shape of the box

        let paragraph = document.createElement("div");
        paragraph.innerHTML = i["nation"];
        paragraph.title = i["nation"];
        paragraph.setAttribute("class", "text overflow");
        //creates the writing which is truncated but can be hovered over to see the full text.

        let closeButton = document.createElement("button");
        closeButton.setAttribute("class","close");
        closeButton.addEventListener("click", Delete);
        closeButton.innerHTML = '&times';
        //creates the close button, with an event listener for when it is clicked(the button removes nations from the list)    
    
        container.appendChild(paragraph);
        container.appendChild(closeButton);
        //adds the buttons and text to the container

        element.appendChild(container);
        //adds the container to the parent
        row.appendChild(element);
        division.appendChild(row);
        //adds the parent to the table.
    }
}   

function Delete(){
    //function to remove a nation from the list
    let Nationindex = CurrentList.filter(obj => {return obj.nation === this.parentElement.children[0].innerHTML});
    //finds the index of the element by which it's name is the same as the one that the button was clicked
    CurrentList.splice(CurrentList.indexOf(Nationindex[0]), 1);
    //removes the nation from the list
    localStorage.setItem(localStorage.getItem('ListName'), JSON.stringify(CurrentList));
    //sends the edited list back
    location.reload();
    //reloads the page
}
