if (document.location.href === 'https://www.nationstates.net/page=create_nation'){
    document.onkeyup = function(event){
        if (event.key === '1'){
            document.getElementsByName("submitbutton")[0].click();
            document.onkeyup = undefined;
        }
    }
}else{

    var portsubmit = chrome.runtime.connect({name:"Create Nation"});

    portsubmit.onMessage.addListener(function(message){
        document.getElementById('name').value = message.name + message.start.toString();
        document.getElementsByName('currency')[0].value = message.currency;
        document.getElementsByName('animal')[0].value = message.animal;
        document.getElementsByName('slogan')[0].value = message.motto;
        document.getElementsByName('email')[0].value = message.email; 
        document.getElementsByName('autologin')[1].checked = false;
        document.getElementsByName('legal')[0].checked = true;
        document.getElementsByName('password')[1].value = message.password; 
        document.getElementsByName('confirm_password')[0].value = message.password; 
    });
    portsubmit.postMessage({'purpose':'Create Nation'});
}