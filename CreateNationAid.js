/*
This program is an aid for creating nations
On the first create nation, a button is added to just skip the questionnare
On the second page a port is created with the background script to get the nations information like the Motto
the inputs are then changed to be this information.
*/


if (document.location.href === 'https://www.nationstates.net/page=create_nation'){
    //if on the first create nation page
    document.getElementsByName("submitbutton")[0].focus();
    //focus on the next page button
}else{
    //otherwise, if on the second create nation page
    var portsubmit = chrome.runtime.connect({name:"Create Nation"});
    //Creates a port to allow requests for information from localStorage
    document.getElementsByName('create_nation')[0].focus();

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
    portsubmit.postMessage();
    //requests the nations parameters from the background script
}