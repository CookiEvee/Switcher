/* 
This program deals with what occurs after an issue is answered

If there are still issues left it takes the user back to the dillemmas page, otherwise it goes back to the deck page.
*/

window.onload = function(event){
    if (document.getElementById('notificationnumber-issues').innerText !== '1'){
        document.location = '/page=dilemmas'
    }else{
        window.location = '/page=deck'
    }
}