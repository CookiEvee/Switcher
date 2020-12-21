/*  
This program is for the Mass input of nations and password into the program.
It does this by sticking to a structure of CookiEvee Cookipass (not actual password)
it then scours through the text input and for each pair of nation and password adds it to the all list
it then adds the new list back to storage.
Also has a back button for navigation
*/

document.getElementById('SubmitMass').addEventListener('click',addUsers);
//adds an event listener to see if the Mass input button is clicked
document.getElementById('BackButton').addEventListener('click', Back);
//adds an event listener to see if the button to go back a menu is clicked

function addUsers(){
    let storageAll = localStorage.getItem("all");
    let nationList = JSON.parse(storageAll);
    //gets the list of all nations and parses it
    for (nation of document.getElementById('textarea').value.split('\n')){
        //for each set of inputs(seperated by a new line)
        let nationName = nation.split(' ')[0];
        let nationPass = nation.split(' ')[1];
        //split the username and password up by a space

        if (nationName !== undefined && nationPass !== undefined){
            //as long as the nation name and nation pass exist
            if (nationList){
                nationList.push({"nation": nationName.toLowerCase().replaceAll(' ','_'),
                    "password": nationPass});
                    //if the all list already exists, then add it to the list
            }else{
                nationList = [{"nation": nationName.toLowerCase().replaceAll(' ','_'),
                    "password": nationPass}];
                    //otherwise create the list
            }
        }
    }
    localStorage.setItem("all", JSON.stringify(nationList));
    //sends sends the edited list back to storage
    location.reload()
    //reloads the location
}

function Back(){
    window.location.href = 'AllList.html';
    //goes back a menu
}
