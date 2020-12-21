/*
This program is an aid for creating nations
On the first create nation, a button is added to just skip the questionnare
On the second page a port is created with the background script to get the nations information like the Motto
the inputs are then changed to be this information.
*/


if (document.location.href === 'https://www.nationstates.net/page=create_nation'){
    //if on the first create nation page
    document.onkeyup = function(event){
        //add a keybind
        if (event.key === '1'){
            //when the '1' key is pressed
            document.getElementsByName("submitbutton")[0].click();
            //click the button at the bottom of the page to skip the questionnare
            document.onkeyup = undefined;
            //stops more buttons being pressed
        }
    }
}else{
    //otherwise, if on the second create nation page
    var portsubmit = chrome.runtime.connect({name:"Create Nation"});
    //Creates a port to allow requests for information from localStorage

    portsubmit.onMessage.addListener(function(message){
        //when the parameters are sent back
        document.getElementById('name').value = message.name + message.start.toString();
        //make the name = the current name + the starting number
        document.getElementsByName('currency')[0].value = message.currency;
        //set the currency
        document.getElementsByName('animal')[0].value = message.animal;
        //set the animal
        document.getElementsByName('slogan')[0].value = message.motto;
        //set the motto
        document.getElementsByName('email')[0].value = message.email; 
        //set the motto
        document.getElementsByName('autologin')[1].checked = false;
        document.getElementsByName('legal')[0].checked = true;
        //checks and unchecks the relevant checkboxes
        document.getElementsByName('password')[1].value = message.password; 
        document.getElementsByName('confirm_password')[0].value = message.password; 
        //sets the password and confirm password fields
    });
    portsubmit.postMessage({'purpose':'Create Nation'});
    //requests the nations parameters from the background script
}