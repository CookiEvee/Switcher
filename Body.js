/* 
This is the main code for switching nations. It is run on all nationstates page, bar a few exceptions.
It adds 2 buttons to the NationStates page, one saying next and one saying back, with each button having a keybind
when one of these buttons are clicked a message is sent to the background script requesting information about-
-either the next or the previous nation in the list(the list is chosen in a different piece of code)
that  data is then sent back to this program and the code then logs in to the respective nation.
There are also keybinds to go to different pages, configurable in config.js
*/

var number;
var parsedStorage;
//declares these variables so they can be used in functions 

var portforward = chrome.runtime.connect({name:"forward"});
var portback = chrome.runtime.connect({name:"back"})
//opens a long-lived connection to background script

checklogin = document.getElementById("loggedin");
//checks if the nation is logged in
if(checklogin){
    currentName = checklogin.getAttribute('data-nname');
}else{
    currentName = false;
}
//if the user is logged in, then it retrieves the nation currently logged in.

//Adds a listener for when the background script tells this script to log in.

portforward.onMessage.addListener(function(message){
    //when a message is sent
    if(message !== 'reload'){
        //if there were no errors in the background script.
        nameInput.setAttribute("value",message.nation);
        passInput.setAttribute("value",message.password);
        //find the name and password.
        if (message.link === undefined){
            switchForm.setAttribute("action", '/');  
        }else{
            switchForm.setAttribute("action",message.link);
        }
        //sets the page to go once the nation is logged in
        foot.appendChild(switchForm);
        switchForm.submit();
        //submits the form and logs in the next nation
    }else{
        window.location.reload();
        //if there was an error, reload the page.
    }
});
//does the same as above but for moving backwards through the list rather than forwards.
portback.onMessage.addListener(function(message){
    //adds a listener for the background script.
    if(message !== 'reload'){
        //if there were no errors in the background script
        nameInput.setAttribute("value",message.nation);
        passInput.setAttribute("value",message.password);
        //Enters the nation name and password to the form
        if (message.link === undefined){
            switchForm.setAttribute("action", '/');  
        }else{
            switchForm.setAttribute("action",message.link);
        }
        //Inputs the page to go to once logged in
        foot.appendChild(switchForm);
        switchForm.submit();
        //submits the form
    }else{
        window.location.reload();
        //if there is an error than reload.
    }
});
//port message listener for when the background replies
let state = document.getElementsByClassName("belspacermain")[0];
let foot = document.getElementById("foot");
//finds location to input form

let switchForm = document.createElement("form");
switchForm.setAttribute("method","post");
switchForm.setAttribute("target","_top");
//creates the login form

let logInput = document.createElement("input");
logInput.setAttribute("type","hidden");
logInput.setAttribute("name","logging_in");
logInput.setAttribute("value","1");
//sets data request as logging in, so the form knows the submission is to log in

let nameInput = document.createElement("input");
nameInput.setAttribute("type","hidden");
nameInput.setAttribute("name","nation");
//creates a username input to fill in for the nation loggin in

let passInput = document.createElement("input");
passInput.setAttribute("type","hidden");
passInput.setAttribute("name","password");
//creates a password input to fill in for the nation logging in

let nextInput = document.createElement("div");
nextInput.id = 'nextInput';
nextInput.setAttribute('class', 'bel');
nextInput.addEventListener("click", loginforward);
nextInput.style.cursor = 'pointer';
nextInput.style.fontSize = '200%';
nextInput.style.color = 'black';
nextInput.innerHTML = '&#129094;';
//adds in a submit button

let backInput = document.createElement("div");
backInput.id = 'backInput'
backInput.setAttribute('class','bel');
backInput.style.cursor = 'pointer';
backInput.style.fontSize = '200%';
backInput.style.color = 'black';
backInput.addEventListener("click", loginback);
backInput.innerHTML = '&#129092;';
//creates a submit button for going Backwards.

var HotKeyDown = function(event) {
    //sets up a listener for if the user presses a key on their keyboard
    if (event.key === config.back) {
        //if the user presses the back key
        event.preventDefault();
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.removeEventListener("click", loginback);
        nextInput.removeEventListener("click", loginforward);
        //stops the user pressing a different key
        loginback()
        //if the user presses 3, then the previous nation in the list is logged in
    }else if (event.key === config.next) {
        //if the user presses the next key
        event.preventDefault();
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.removeEventListener("click", loginback);
        nextInput.removeEventListener("click", loginforward);
        //stops the user pressing a different key
        loginforward()
        //if the user presses the right arrow, then the next nation is logged in
    }else if (event.key === config.flag){
        //if the user presses the flag key
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.removeEventListener("click", loginback);
        nextInput.removeEventListener("click", loginforward);
        //stops the user pressing a different Key
        document.location = '/page=upload_flag'
        //if the user presses the c key then the page is changed to the upload flag page.
    }else if (event.key === config.create){
        //if the use presses the create nation key
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.removeEventListener("click", loginback);
        nextInput.removeEventListener("click", loginforward);
        //stops the user pressing a different key
        document.location = '/page=create_nation';
        //goes to the create_nation page
    }else if (event.key === config.value){
        //if the user presses the value_deck key
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.removeEventListener("click", loginback);
        nextInput.removeEventListener("click", loginforward);
        //stops the user pressing a different key
        document.location = '/page=deck/value_deck=1'
        //goes to the value_deck page
    }else if(event.key === config.deck){
        //if the user presses the deck key
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.removeEventListener("click", loginback);
        nextInput.removeEventListener("click", loginforward);
        //stops the user pressing a different button
        document.location = '/page=deck';
        //goes to the deck page
    }
};

document.onkeydown = HotKeyDown
//sets up the keybinds
switchForm.appendChild(logInput);
switchForm.appendChild(nameInput);
switchForm.appendChild(passInput);
//adds all of the parameters to the login form

state.prepend(nextInput);
state.prepend(backInput);
document.getElementsByClassName('belspacermain')[0].prepend(document.getElementsByClassName('belspacerchild')[0]);
//adds form to the page

function loginforward(){
    portforward.postMessage({'name':currentName, 'direction': 1});
}
//when activated this sends a message to the background script telling it to login the next nation

function loginback(){
    portforward.postMessage({'name': currentName, 'direction': -1});
}
//when activated, this sends a message to the background script telling it to login to the previous nation