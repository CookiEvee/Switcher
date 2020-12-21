/* 
This program deals with what occurs after an issue is answered

If there are still issues left it takes the user back to the dillemmas page, otherwise it goes back to the deck page.
*/

window.onload = function(event){
    if (document.getElementById('notificationnumber-issues').innerHTML === '1'){
        //if there are no issues
        document.location = '/page=deck';
        //goes to the cards page
    }else{
        //otherwise if there still are issues
        document.location ='/page=dilemmas';
        //goes back to issues page
    }
};
