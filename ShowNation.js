let AllList = JSON.parse(localStorage.getItem("all"));
//gets the all list from storage
let division = document.getElementById("ShowDiv");
let row = document.createElement("row");
//creates the table
var Name;
var i;
//declares the variables for use in functions
if(AllList){
    //if the all list exists
    for (i of AllList){
        //for each nation in the list
        let element = document.createElement("div");
        let container = document.createElement("div");
        let closeButton = document.createElement("button");
        //creates the container and elements
        container.setAttribute("class","w3-container");
        element.setAttribute("class","card element");
        //sets up the style for the container

        let paragraph = document.createElement("div");
        paragraph.innerHTML = i["nation"];
        paragraph.title = i["nation"];
        paragraph.setAttribute("class", "text overflow")
        paragraph.id = '1';
        //creates the text, it's style and it's title

        closeButton.setAttribute("class","close");
        closeButton.addEventListener("click", Delete);
        closeButton.innerHTML = '&times';
        //creates a close button with an event listener for when it is clicked

        container.appendChild(paragraph);
        container.appendChild(closeButton);
        element.appendChild(container);
        row.appendChild(element);
        division.appendChild(row);
        //adds the nation to the table
    }
}

function Delete(){
    Name = this.parentElement.children[0].innerHTML;
    //fetches the name of the nation
    let Lists = Object.keys(localStorage);
    //fetches all of the lists
    Lists.splice(Lists.indexOf('ListName'), 1);
    //removes the list which says which list the user is editing.
    for (i of Lists){
        //for each of the lists
        try{
            let iterableList = JSON.parse(localStorage.getItem(i));
            //attempts to parse the list
            let Index = iterableList.indexOf(iterableList.find(findIndex));
            //attempts to find the index of the nation being deleted
            if (Index !== -1){
                //if the nation is in the list
                iterableList.splice(Index, 1);
                //removes the nation from the list
                localStorage.setItem(i, JSON.stringify(iterableList));
                //sends back the edited list
            } 
        }catch(err){}
    }
    location.reload();
    //reloads the page
}

function findIndex(nation){
    return nation["nation"] === Name;
    //only returns if the nation name is the same as the nation being deleted
}
