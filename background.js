/* 
This code is the background code for the extension.
It receives messages from the content scripts and returns the appropriate information.
1 - Finds the region name for new puppets to change the page to that region's page
2 - Finds the region password to allow a nation to move into a region
3 - Finds the Default information for creating a new nation
4 - Finds the current list in which the user wishes to change nations, then finds the next or the previous nation
in the list, dependent on which port was called, and then returns the information about the nation to the content
script so it can be acted upon.
*/

chrome.runtime.onConnect.addListener(function(port){
    //connects and creates a port to transfer messages between the extension and content scripts
    port.onMessage.addListener(function(message) {
        if (port.name === 'Region'){
            let RegionalList = JSON.parse(localStorage.getItem('Settings'));
            port.postMessage(RegionalList.region);
        }else if (port.name === 'MoveRegion'){
            let RegionalList = JSON.parse(localStorage.getItem('Settings'));
            port.postMessage(RegionalList.regionpassword);
        }else if (message.purpose){
            let NationInput = JSON.parse(localStorage.getItem('Settings'));
            NationInput.start= parseInt(NationInput.start)+1;
            localStorage.setItem('Settings',JSON.stringify(NationInput)); 
            port.postMessage(NationInput);
        }else{
            //creates a listener for when a the Body sends a message to try and switch nations.
            var NationDetails;
            var indexnumber;
            var ChosenList;
            var LinkList;
            //declares variables for global use
            try{
                ChosenList = JSON.parse(localStorage.getItem(localStorage.getItem('ChosenList')));
                //tries to find the list that has been chosen to switch
                if (ChosenList === null || ChosenList === undefined){
                    ChosenList = JSON.parse(localStorage.getItem('all'));
                    //if the list has not been chosen or there is some error with it, the program defaults to the all list.
                }
                let all = JSON.parse(localStorage.getItem('all'));
                //gets the entire list of nations and passwords
                if(ChosenList.length !== 0){
                    //if the list isn't empty
                    if(message.name){
                        //checks the message sent a nation name(the nation currently logged in)
                        indexnumber = ChosenList.findIndex(function(item){
                            return item.nation.toLowerCase().replaceAll(' ','_') === message.name.toLowerCase().replaceAll(' ','_');
                        });
                        //finds the index of the current nation
                        if (indexnumber+1 === ChosenList.length && message.direction === 1){
                            indexnumber = -1;
                            window.alert("Alert: you have completed a cycle of your list")
                            //if the nation is the last nation in the list, then it alerts thus.
                            let nationName = ChosenList[indexnumber+1].nation;
                            NationDetails = all.find(function(item){
                                return item.nation.toLowerCase() === nationName;
                            });
                            //cycles to the start of the list
                        }else if(indexnumber === 0 && message.direction === -1){
                            //if hit the end of the loop going backwards
                            indexnumber = ChosenList.length;
                            //goes to the end of the list
                            let nationName = ChosenList[indexnumber-1].nation;
                            NationDetails = all.find(function(item){
                                return item.nation.toLowerCase() === nationName;
                            });
                            //sends the details of the last nation in the list back
                        }else{
                            let nationName = ChosenList[indexnumber+message.direction].nation;
                            NationDetails = all.find(function(item){
                                return item.nation.toLowerCase() === nationName;
                            });
                            //otherwise it just heads forwards or backwards one nation, dependent on what is requested.
                        }
                    }else{
                        //if no nation is logged in
                        if (message.direction === 1){
                            indexnumber = -1;
                        }else{
                            indexnumber = ChosenList.length;
                        }
                        //goes to the start or end of the list dependent on which was requested.
                        let nationName = ChosenList[indexnumber+message.direction].nation;
                        //gets the nation name of the number calculated through the algorithm above
                        NationDetails = all.find(function(item){
                            return item.nation.toLowerCase() === nationName;
                        });
                        //finds the password of the nation name
                    }
                    if (localStorage.getItem('ChosenList') === 'all'){
                        NationDetails['link'] = '/';
                        //if the list is the all list, then the default page is the one that is logged into
                    }else{
                        LinkList = JSON.parse(localStorage.getItem('Links'));
                        NationDetails['link'] = LinkList[localStorage.getItem('ChosenList')];
                        //otherwise the customised link is used(gotten from localstorage)
                    }
                    port.postMessage(NationDetails);
                    //sends the message back with the nation name, nation password and nation link
                }
            else{
                //if the list is empty sends an alert as such 
                window.alert('List is empty please populate it');
                port.postMessage('reload');
            }
        }catch(err){
            //in case an error occurs, so the user can report it/bug fix it.
            window.alert(err);
            port.postMessage('reload');
            //sends a message alerting the document that there was an error.
            }
        }
    });
});
