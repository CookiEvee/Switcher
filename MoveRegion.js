/* 
This program is for moving page to the region that a new nation wants to move to.
It sends a request to the background script, which then sends the region decided in the Settings page back
The page is then changed to that region
*/

document.onkeyup = function(event){
    //adds a keybind
    if (event.key === config.move){
        //when 'm' is pressed
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        backInput.remove();
        nextInput.remove();
        //disables all possible inputs
        var portRegion = chrome.runtime.connect({name: "Region"});
        //sets up a port for requesting the region name which the nation wants to move to.
        portRegion.onMessage.addListener(function(message){
            document.location = '/region='+message;
            //when the port sends the data back, the user is redirected to the region page
        });
        portRegion.postMessage({});
        //requests the region page
    }
}