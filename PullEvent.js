/* 
This is the pull event script, when the user pressed h(can be turned off to just pressing anything)
it will find the bid you've placed and up it
*/
document.onkeydown = function(event){
    if(event.key == 'h'){
        if(document.querySelectorAll('[title="Click to edit"]')[1]){
            document.querySelectorAll('[title="Click to edit"]')[1].firstChild.click();
        }else{
            document.querySelectorAll('[title="Click to edit"]')[0].firstChild.click();        
        }
        document.getElementById('new_price_value').value = parseFloat(document.getElementById('new_price_value').value)+0.01;
        document.getElementById('change_price_button').click();
    }
};