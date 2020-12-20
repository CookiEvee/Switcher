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
