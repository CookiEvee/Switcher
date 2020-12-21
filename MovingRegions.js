/* 
This program allows users to move regions by, when pressing 'm', sending a request for the region password.
When that password is recieved back from the background script, it is then used to click the move region button
*/

let form = document.getElementsByName('localid')[0].parentElement
//creates a form to move regions

var PasswordInput = document.createElement('input')
PasswordInput.type = 'hidden';
PasswordInput.name = 'password'
form.appendChild(PasswordInput);
//creates an input for the password

var portMove = chrome.runtime.connect({name:"MoveRegion"});
//creates a port to get the password
portMove.onMessage.addListener(function(message){
    PasswordInput.value = message;
    //when the port sends back the password, the password input it set to the reply message
    document.getElementsByName('move_region')[0].click();
    //and the button to move regions is clicked
})
document.onkeyup= function(event){
    //creates a keybind
    if (event.key === 'm'){
        //when the button 'm' is clicked
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.remove();
        nextInput.remove();
        //stops all other buttons from being pressed
        portMove.postMessage({});
        //sends a request for the password
    }
}