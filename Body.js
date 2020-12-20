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

let state = document.getElementById("banner");
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

let nextInput = document.createElement("button");
nextInput.id = 'nextInput';
nextInput.setAttribute("type","button");
nextInput.addEventListener("click", loginforward);
nextInput.innerHTML = 'Next';
//adds in a submit button

let backInput = document.createElement("button");
backInput.id = 'backInput'
backInput.setAttribute("type","button");
backInput.addEventListener("click", loginback);
backInput.innerHTML = 'Previous';
//creates a submit button for going Backwards.

var HotKeyDown = function(event) {
    //sets up a listener for if the user presses a key on their keyboard
    if (event.key === '3') {
        event.preventDefault();
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.remove();
        nextInput.remove();
        //stops the user pressing a different key
        backInput.click();
        //if the user presses 3, then the previous nation in the list is logged in
    }else if (event.key === 'ArrowRight') {
        event.preventDefault();
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.remove();
        nextInput.remove();
        //stops the user pressing a different key
        nextInput.click();
        //if the user presses the right arrow, then the next nation is logged in
    }else if (event.key === '`'){
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.remove();
        nextInput.remove();
        document.location = '/page=deck';
        //if the user presses the grave key, then the page is changed to the cards deck page.
    }
};

document.onkeydown = HotKeyDown

switchForm.appendChild(logInput);
switchForm.appendChild(nameInput);
switchForm.appendChild(passInput);
//adds all of the parameters to the login form

state.appendChild(nextInput);
state.appendChild(backInput);
//adds form to the page

function loginforward(){
    portforward.postMessage({'name':currentName, 'direction': 1});
}
//when activated this sends a message to the background script telling it to login the next nation

function loginback(){
    portforward.postMessage({'name': currentName, 'direction': -1});
}
//when activated, this sends a message to the background script telling it to login to the previous nation