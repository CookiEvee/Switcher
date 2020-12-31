/* 
This is the pull event script, when the user pressed h(can be turned off to just pressing anything)
it will find the bid you've placed and up it
*/
document.onkeyup = function(event){
    //creates a keybind
    if(event.key == 'h'){
        //if h is pressed
        if(document.querySelectorAll('[title="Click to edit"]')[1]){
            //if there is a self match
            document.querySelectorAll('[title="Click to edit"]')[1].firstChild.click();
            //edit the bid
        }else{
            document.querySelectorAll('[title="Click to edit"]')[0].firstChild.click();  
            //otherwise edit the bid      
        }
        document.getElementById('new_price_value').value = parseFloat(document.getElementById('new_price_value').value)+0.01;
        //increment the bid by 1
        document.onkeydown = undefined
        document.onkeyup = undefined
        //stop other actions being done
        document.getElementById('change_price_button').click();
        //submit the new price
    }else if (event.key === '`'){
        document.location = '/page=deck';
    }
};
